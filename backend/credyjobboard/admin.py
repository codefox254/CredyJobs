from django.contrib import admin
admin.site.site_header = "Credyjobs adminsite"
admin.site.site_title = "Credyjobs adminsite"
from .models import Advert
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
	list_display = ("title", "company", "location", "employment_type", "category", "is_active", "posted_at", "image")
	search_fields = ("title", "company", "location", "category")
	list_filter = ("employment_type", "category", "is_active")

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
