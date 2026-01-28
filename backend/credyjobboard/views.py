from django.http import JsonResponse
from .models import CrawlProgress, CrawlSource

def crawl_progress_view(request):
	source_id = request.GET.get('source_id')
	if not source_id:
		return JsonResponse({'percent': 0, 'jobs': []})
	progress = CrawlProgress.get(source_id)
	return JsonResponse({'percent': progress.percent, 'jobs': progress.jobs})
from .models import Advert
from .serializers import AdvertSerializer
from rest_framework import generics, viewsets, permissions

class AdvertViewSet(viewsets.ModelViewSet):
	queryset = Advert.objects.all().order_by('-created_at')
	serializer_class = AdvertSerializer
	permission_classes = [permissions.IsAuthenticatedOrReadOnly]
from rest_framework import viewsets
from .models import Job
from .serializers import JobSerializer
from .footer_view import FooterViewSet

class JobViewSet(viewsets.ModelViewSet):
	queryset = Job.objects.all().order_by('-posted_at')
	serializer_class = JobSerializer
	filterset_fields = ['location', 'company', 'is_active', 'employment_type', 'category', 'is_featured']
	search_fields = ['title', 'description', 'company', 'location']
