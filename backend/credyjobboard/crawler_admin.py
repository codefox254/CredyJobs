
from django.contrib import admin
from django.urls import path, reverse
from django.shortcuts import render, redirect
from django.db.models import Count, Max
from .models import CrawledJob, CrawlSource
import datetime
import subprocess
from django.contrib import messages

class CrawlerDashboardAdmin:
    @staticmethod
    def get_urls(admin_site):
        return [
            path('crawler-dashboard/', admin_site.admin_view(CrawlerDashboardAdmin.dashboard_view), name='crawler-dashboard'),
            path('trigger-crawl/', admin_site.admin_view(CrawlerDashboardAdmin.trigger_crawl), name='trigger-crawl'),
        ]

    @staticmethod
    def dashboard_view(request):
        today = datetime.date.today()
        week_ago = today - datetime.timedelta(days=7)
        month_ago = today - datetime.timedelta(days=30)

        total_crawled = CrawledJob.objects.count()
        crawled_today = CrawledJob.objects.filter(date_found__date=today).count()
        crawled_week = CrawledJob.objects.filter(date_found__date__gte=week_ago).count()
        crawled_month = CrawledJob.objects.filter(date_found__date__gte=month_ago).count()
        approved = CrawledJob.objects.filter(is_approved=True).count()
        rejected = CrawledJob.objects.filter(is_rejected=True).count()
        pending = CrawledJob.objects.filter(is_approved=False, is_rejected=False).count()
        sources = CrawlSource.objects.annotate(job_count=Count('crawledjob'))
        last_crawls = CrawledJob.objects.values('source__name').annotate(last=Max('date_found'))

        # Performance data for the last 30 days
        perf_labels = []
        perf_data = []
        for i in range(30, -1, -1):
            day = today - datetime.timedelta(days=i)
            perf_labels.append(day.strftime('%Y-%m-%d'))
            count = CrawledJob.objects.filter(date_found__date=day).count()
            perf_data.append(count)

        # Get source_id from request (GET, POST, or session as needed)
        source_id = request.GET.get('source_id') or request.POST.get('source_id')
        if not source_id and sources:
            # Default to first source if available
            first_source = sources.first()
            source_id = first_source.id if first_source else None

        context = dict(
            admin.site.each_context(request),
            total_crawled=total_crawled,
            crawled_today=crawled_today,
            crawled_week=crawled_week,
            crawled_month=crawled_month,
            approved=approved,
            rejected=rejected,
            pending=pending,
            sources=sources,
            last_crawls=last_crawls,
            perf_labels=perf_labels,
            perf_data=perf_data,
            source_id=source_id,
        )
        return render(request, "admin/crawler_dashboard.html", context)

    @staticmethod
    def trigger_crawl(request):
        # Run the management command or script for crawling
        try:
            # Example: subprocess.run(["python3", "manage.py", "run_crawlers"], check=True)
            subprocess.run(["/bin/bash", "scripts/auto_crawl.sh"], cwd="../backend", check=True)
            messages.success(request, "Crawl triggered successfully.")
        except Exception as e:
            messages.error(request, f"Crawl failed: {e}")
        return redirect(reverse('admin:crawler-dashboard'))

# Add the dashboard link to the admin index

