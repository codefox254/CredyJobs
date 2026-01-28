
from django.contrib import admin
from .models import CrawlReport, Advert, CrawlSource, CrawledJob

@admin.register(CrawlReport)
class CrawlReportAdmin(admin.ModelAdmin):
	list_display = ("source", "started_at", "finished_at", "jobs_found", "jobs_updated", "summary")
	readonly_fields = ("source", "started_at", "finished_at", "jobs_found", "jobs_updated", "errors", "summary")
	search_fields = ("source__name", "summary")
	list_filter = ("source",)

admin.site.site_header = "Credyjobs adminsite"
admin.site.site_title = "Credyjobs adminsite"

# Dummy model for Crawler Dashboard
from django.db import models
class CrawlerDashboard(models.Model):
	class Meta:
		verbose_name = "Crawler Dashboard"
		verbose_name_plural = "Crawler Dashboard"
		app_label = "credyjobboard"

from django.urls import path
from django.shortcuts import render, redirect
from django.contrib import messages
from django.utils.html import format_html
import datetime
from .models import CrawledJob, CrawlSource
from django.db.models import Count, Max
import subprocess

class CrawlerDashboardAdmin(admin.ModelAdmin):
	change_list_template = "admin/crawler_dashboard.html"
	def get_urls(self):
		urls = super().get_urls()
		custom_urls = [
			path('trigger-crawl/', self.admin_site.admin_view(self.trigger_crawl), name='credyjobboard_crawlerdashboard_trigger_crawl'),
		]
		return custom_urls + urls

	def changelist_view(self, request, extra_context=None):
		context = self.get_dashboard_context(request)
		if request.GET.get('ajax') == '1':
			from django.template.loader import render_to_string
			from django.http import HttpResponse
			stat_html = render_to_string("admin/crawler_dashboard_stats.html", context, request=request)
			return HttpResponse(stat_html)
		if not extra_context:
			extra_context = {}
		extra_context.update(context)
		return super().changelist_view(request, extra_context=extra_context)

	def get_dashboard_context(self, request):
		today = datetime.date.today()
		week_ago = today - datetime.timedelta(days=7)
		month_ago = today - datetime.timedelta(days=30)
		from django.utils import timezone
		now = timezone.now()
		last_24h = now - datetime.timedelta(hours=24)
		total_crawled = CrawledJob.objects.filter(date_found__gte=last_24h).count()
		crawled_today = CrawledJob.objects.filter(date_found__date=today).count()
		crawled_week = CrawledJob.objects.filter(date_found__date__gte=week_ago).count()
		crawled_month = CrawledJob.objects.filter(date_found__date__gte=month_ago).count()
		approved = CrawledJob.objects.filter(is_approved=True).count()
		rejected = CrawledJob.objects.filter(is_rejected=True).count()
		pending = CrawledJob.objects.filter(is_approved=False, is_rejected=False).count()
		sources = CrawlSource.objects.annotate(job_count=Count('crawledjob'))
		last_crawls = CrawledJob.objects.values('source__name').annotate(last=Max('date_found'))
		perf_labels = []
		perf_data = []
		for i in range(30, -1, -1):
			day = today - datetime.timedelta(days=i)
			perf_labels.append(day.strftime('%Y-%m-%d'))
			count = CrawledJob.objects.filter(date_found__date=day).count()
			perf_data.append(count)
		from django.urls import reverse
		from .models import CrawlReport
		crawl_reports = CrawlReport.objects.filter(started_at__gte=last_24h)
		return {
			'total_crawled': total_crawled,
			'crawled_today': crawled_today,
			'crawled_week': crawled_week,
			'crawled_month': crawled_month,
			'approved': approved,
			'rejected': rejected,
			'pending': pending,
			'sources': sources,
			'last_crawls': last_crawls,
			'perf_labels': perf_labels,
			'perf_data': perf_data,
			'trigger_url': reverse('admin:credyjobboard_crawlerdashboard_trigger_crawl'),
			'crawl_reports': crawl_reports,
		}

	def trigger_crawl(self, request):
		import shlex
		try:
			result = subprocess.run(
				["/bin/bash", "scripts/auto_crawl.sh"],
				cwd="../backend",
				check=True,
				capture_output=True,
				text=True
			)
			# Try to extract jobs found from output
			jobs_found = None
			for line in result.stdout.splitlines():
				if "jobs found" in line:
					jobs_found = line.strip()
			if jobs_found:
				messages.success(request, f"Crawl triggered successfully. {jobs_found}")
			else:
				messages.success(request, "Crawl triggered successfully.")
		except subprocess.CalledProcessError as e:
			error_msg = e.stderr or str(e)
			messages.error(request, f"Crawl failed: {error_msg}")
		return redirect("..")

admin.site.register(CrawlerDashboard, CrawlerDashboardAdmin)
@admin.register(CrawledJob)
class CrawledJobAdmin(admin.ModelAdmin):
	list_display = ("title", "company", "location", "date_found", "is_approved", "is_rejected", "source", "preview_link")
	readonly_fields = ("title", "company", "location", "apply_url", "description", "source", "date_found", "is_approved", "is_rejected", "image_tag")

	def get_urls(self):
		from django.urls import path
		urls = super().get_urls()
		custom_urls = [
			path('<int:pk>/preview/', self.admin_site.admin_view(self.preview_view), name='credyjobboard_crawledjob_preview'),
		]
		return custom_urls + urls

	def preview_link(self, obj):
		from django.urls import reverse
		url = reverse('admin:credyjobboard_crawledjob_preview', args=[obj.pk])
		return format_html('<a href="{}" target="_blank">Preview</a>', url)
	preview_link.short_description = "Preview"

	def image_tag(self, obj):
		if hasattr(obj, 'image') and obj.image:
			return format_html('<img src="{}" style="max-width:200px;max-height:200px;" />', obj.image.url)
		return ""
	image_tag.short_description = "Image"

	def preview_view(self, request, pk):
		obj = self.get_object(request, pk)
		context = dict(
			self.admin_site.each_context(request),
			title=f"Preview: {obj}",
			original=obj,
			opts=self.model._meta,
			object_id=obj.pk,
		)
		return render(request, "admin/crawledjob_preview.html", context)
	search_fields = ("title", "company", "location")
	list_filter = ("is_approved", "is_rejected", "source")
	actions = ["approve_jobs", "reject_jobs"]

	def approve_jobs(self, request, queryset):
		for job in queryset:
			if not job.is_approved and not job.is_rejected:
				# Create Job entry
				from .models import Job
				Job.objects.create(
					title=job.title,
					company=job.company or '',
					location=job.location or '',
					apply_url=job.apply_url,
					description=job.description or '',
					is_active=True
				)
				job.is_approved = True
				job.save()
		self.message_user(request, "Selected jobs approved and posted.")
	approve_jobs.short_description = "Approve and post selected jobs"

	def reject_jobs(self, request, queryset):
		queryset.update(is_rejected=True)
		self.message_user(request, "Selected jobs rejected.")
	reject_jobs.short_description = "Reject selected jobs"
@admin.register(CrawlSource)
class CrawlSourceAdmin(admin.ModelAdmin):
	list_display = ("name", "url", "is_active", "frequency", "next_run", "added_at")
	search_fields = ("name", "url")
	list_filter = ("is_active", "frequency")
	actions = ["run_selected_crawlers", "set_frequency_manual", "set_frequency_5min", "set_frequency_10min", "set_frequency_30min", "set_frequency_hourly", "set_frequency_daily", "set_frequency_weekly", "set_frequency_monthly", "set_frequency_quarterly", "set_frequency_yearly"]

	def run_selected_crawlers(self, request, queryset):
		from credyjobboard.crawler import crawl_openedcareer
		count = 0
		for source in queryset:
			if 'openedcareer.com' in source.url:
				crawl_openedcareer(source=source)
				count += 1
		self.message_user(request, f"Triggered crawl for {count} selected sources.")
	run_selected_crawlers.short_description = "Run crawl for selected sources now"

	def set_frequency_manual(self, request, queryset):
		queryset.update(frequency="manual")
		self.message_user(request, "Set frequency to Manual for selected sources.")
	set_frequency_manual.short_description = "Set frequency: Manual Only"

	def set_frequency_5min(self, request, queryset):
		queryset.update(frequency="5min")
		self.message_user(request, "Set frequency to Every 5 Minutes for selected sources.")
	set_frequency_5min.short_description = "Set frequency: Every 5 Minutes"

	def set_frequency_10min(self, request, queryset):
		queryset.update(frequency="10min")
		self.message_user(request, "Set frequency to Every 10 Minutes for selected sources.")
	set_frequency_10min.short_description = "Set frequency: Every 10 Minutes"

	def set_frequency_30min(self, request, queryset):
		queryset.update(frequency="30min")
		self.message_user(request, "Set frequency to Every 30 Minutes for selected sources.")
	set_frequency_30min.short_description = "Set frequency: Every 30 Minutes"

	def set_frequency_hourly(self, request, queryset):
		queryset.update(frequency="hourly")
		self.message_user(request, "Set frequency to Hourly for selected sources.")
	set_frequency_hourly.short_description = "Set frequency: Hourly"

	def set_frequency_daily(self, request, queryset):
		queryset.update(frequency="daily")
		self.message_user(request, "Set frequency to Daily for selected sources.")
	set_frequency_daily.short_description = "Set frequency: Daily"

	def set_frequency_weekly(self, request, queryset):
		queryset.update(frequency="weekly")
		self.message_user(request, "Set frequency to Weekly for selected sources.")
	set_frequency_weekly.short_description = "Set frequency: Weekly"

	def set_frequency_monthly(self, request, queryset):
		queryset.update(frequency="monthly")
		self.message_user(request, "Set frequency to Monthly for selected sources.")
	set_frequency_monthly.short_description = "Set frequency: Monthly"

	def set_frequency_quarterly(self, request, queryset):
		queryset.update(frequency="quarterly")
		self.message_user(request, "Set frequency to Quarterly for selected sources.")
	set_frequency_quarterly.short_description = "Set frequency: Quarterly"

	def set_frequency_yearly(self, request, queryset):
		queryset.update(frequency="yearly")
		self.message_user(request, "Set frequency to Yearly for selected sources.")
	set_frequency_yearly.short_description = "Set frequency: Yearly"
@admin.register(Advert)
class AdvertAdmin(admin.ModelAdmin):
	list_display = ("title", "is_active", "created_at")
	search_fields = ("title", "description")
	list_filter = ("is_active",)
from .models import Job
from .footer import Footer


import csv
from django.http import HttpResponseRedirect
from django.urls import path
from django import forms
from django.shortcuts import render

class CsvImportForm(forms.Form):
	csv_upload = forms.FileField()


@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
	list_display = ("title", "company", "location", "employment_type", "category", "is_active", "is_featured", "posted_at", "image")
	search_fields = ("title", "company", "location", "category")
	list_filter = ("employment_type", "category", "is_active", "is_featured")

	change_list_template = "admin/jobs_changelist.html"

	def get_urls(self):
		urls = super().get_urls()
		my_urls = [
			path('upload-csv/', self.upload_csv),
		]
		return my_urls + urls

	def upload_csv(self, request):
		if request.method == "POST":
			csv_file = request.FILES["csv_upload"]
			reader = csv.DictReader(csv_file.read().decode("utf-8").splitlines())
			for row in reader:
				Job.objects.create(
					title=row.get("title", ""),
					description=row.get("description", ""),
					location=row.get("location", ""),
					company=row.get("company", ""),
					apply_url=row.get("apply_url", ""),
					employment_type=row.get("employment_type", "full_time"),
					category=row.get("category", ""),
					is_active=row.get("is_active", "True") in ["True", "true", "1"],
				)
			self.message_user(request, "Jobs uploaded successfully!")
			return HttpResponseRedirect("../")
		form = CsvImportForm()
		context = {"form": form, "title": "Upload Jobs from CSV"}
		return render(request, "admin/csv_form.html", context)

@admin.register(Footer)
class FooterAdmin(admin.ModelAdmin):
    list_display = ("text", "contact", "updated_at")
