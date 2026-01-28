from django.db import models
from django.core.cache import cache

class CrawlSource(models.Model):
	name = models.CharField(max_length=255)
	url = models.URLField(unique=True)
	is_active = models.BooleanField(default=True)
	added_at = models.DateTimeField(auto_now_add=True)

	# Scheduling fields
	FREQUENCY_CHOICES = [
		("manual", "Manual Only"),
		("5min", "Every 5 Minutes"),
		("10min", "Every 10 Minutes"),
		("30min", "Every 30 Minutes"),
		("hourly", "Hourly"),
		("daily", "Daily"),
		("weekly", "Weekly"),
		("monthly", "Monthly"),
		("quarterly", "Quarterly"),
		("yearly", "Yearly"),
		("custom", "Custom Cron Expression"),
	]
	frequency = models.CharField(max_length=32, choices=FREQUENCY_CHOICES, default="manual")
	cron_expression = models.CharField(max_length=100, blank=True, null=True, help_text="If custom, use standard cron format.")
	next_run = models.DateTimeField(blank=True, null=True, help_text="Next scheduled run time (auto-managed)")

	def __str__(self):
		return self.name or self.url

class CrawlReport(models.Model):
	source = models.ForeignKey(CrawlSource, on_delete=models.CASCADE, null=True, blank=True)
	started_at = models.DateTimeField(auto_now_add=True)
	finished_at = models.DateTimeField(null=True, blank=True)
	jobs_found = models.IntegerField(default=0)
	jobs_updated = models.IntegerField(default=0)
	errors = models.TextField(blank=True)
	summary = models.TextField(blank=True)

	class Meta:
		ordering = ['-started_at']

# Model to track crawl progress (not in DB, just for typing)
class CrawlProgress:
	def __init__(self, percent=0, jobs=None):
		self.percent = percent
		self.jobs = jobs or []

	@staticmethod
	def get(source_id):
		data = cache.get(f'crawl_progress_{source_id}')
		if data:
			return CrawlProgress(**data)
		return CrawlProgress()

	@staticmethod
	def set(source_id, percent, jobs):
		cache.set(f'crawl_progress_{source_id}', {'percent': percent, 'jobs': jobs}, timeout=600)

	@staticmethod
	def clear(source_id):
		cache.delete(f'crawl_progress_{source_id}')

class CrawledJob(models.Model):
	title = models.CharField(max_length=255)
	company = models.CharField(max_length=255, blank=True, null=True)
	location = models.CharField(max_length=255, blank=True, null=True)
	apply_url = models.URLField()
	description = models.TextField(blank=True, null=True)
	image = models.ImageField(upload_to='job_images/', blank=True, null=True)
	source = models.ForeignKey('credyjobboard.CrawlSource', on_delete=models.SET_NULL, null=True, blank=True)
	date_found = models.DateTimeField(auto_now_add=True)
	is_approved = models.BooleanField(default=False)
	is_rejected = models.BooleanField(default=False)

	def __str__(self):
		return f"{self.title} at {self.company or ''} (Crawled)"
class Advert(models.Model):
	title = models.CharField(max_length=255)
	description = models.TextField(blank=True)
	image = models.ImageField(upload_to='job_images/', blank=True, null=True)
	is_active = models.BooleanField(default=True)
	created_at = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return self.title
from django.db import models

class Job(models.Model):
	title = models.CharField(max_length=255)
	description = models.TextField()
	location = models.CharField(max_length=255)
	company = models.CharField(max_length=255)
	apply_url = models.URLField()
	image = models.ImageField(upload_to='job_images/', blank=True, null=True)
	EMPLOYMENT_TYPES = [
		("full_time", "Full Time"),
		("part_time", "Part Time"),
		("contract", "Contract"),
		("internship", "Internship"),
		("temporary", "Temporary"),
		("remote", "Remote"),
		("other", "Other"),
	]
	employment_type = models.CharField(max_length=32, choices=EMPLOYMENT_TYPES, default="full_time")
	category = models.CharField(max_length=100, blank=True, null=True)
	posted_at = models.DateTimeField(auto_now_add=True)
	is_active = models.BooleanField(default=True)
	is_featured = models.BooleanField(default=False)

	def __str__(self):
		return f"{self.title} at {self.company}"
