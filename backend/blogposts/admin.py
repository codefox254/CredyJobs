from django.contrib import admin
from .models import BlogPost

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
	list_display = ("title", "is_published", "posted_at")
	search_fields = ("title",)
