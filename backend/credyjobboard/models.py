from django.db import models

class Job(models.Model):
	title = models.CharField(max_length=255)
	description = models.TextField()
	location = models.CharField(max_length=255)
	company = models.CharField(max_length=255)
	apply_url = models.URLField()
	image = models.ImageField(upload_to='job_images/', blank=True, null=True)
	posted_at = models.DateTimeField(auto_now_add=True)
	is_active = models.BooleanField(default=True)

	def __str__(self):
		return f"{self.title} at {self.company}"
