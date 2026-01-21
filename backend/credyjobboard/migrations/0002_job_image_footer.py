from django.db import migrations, models

class Migration(migrations.Migration):
    dependencies = [
        ('credyjobboard', '0001_initial'),
    ]
    operations = [
        migrations.AddField(
            model_name='job',
            name='image',
            field=models.ImageField(upload_to='job_images/', blank=True, null=True),
        ),
        migrations.CreateModel(
            name='Footer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(max_length=255, default='© 2026 CredyJobs. All rights reserved.')),
                ('contact', models.CharField(max_length=255, blank=True, null=True)),
                ('links', models.JSONField(default=list, blank=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
    ]