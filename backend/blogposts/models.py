from django.db import models

class BlogPost(models.Model):
	title = models.CharField(max_length=255)
	content = models.TextField()
	image = models.ImageField(upload_to='blog_images/', blank=True, null=True)
	posted_at = models.DateTimeField(auto_now_add=True)
	is_published = models.BooleanField(default=True)

	def __str__(self):
		return self.title
