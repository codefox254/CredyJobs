from django.contrib import admin
from .models import Job
from .footer import Footer

@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
	list_display = ("title", "company", "location", "is_active", "posted_at", "image")
	search_fields = ("title", "company", "location")

@admin.register(Footer)
class FooterAdmin(admin.ModelAdmin):
    list_display = ("text", "contact", "updated_at")
