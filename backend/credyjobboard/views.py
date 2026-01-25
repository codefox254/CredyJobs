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
	filterset_fields = ['location', 'company', 'is_active', 'employment_type', 'category']
	search_fields = ['title', 'description', 'company', 'location']
