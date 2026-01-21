from django.db import models

class Footer(models.Model):
    text = models.CharField(max_length=255, default='© 2026 CredyJobs. All rights reserved.')
    contact = models.CharField(max_length=255, blank=True, null=True)
    links = models.JSONField(default=list, blank=True)  # [{label, url}]
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.text
