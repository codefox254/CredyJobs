from rest_framework import viewsets
from .models import Job
from .serializers import JobSerializer
from .footer_view import FooterViewSet

class JobViewSet(viewsets.ModelViewSet):
	queryset = Job.objects.all().order_by('-posted_at')
	serializer_class = JobSerializer
	filterset_fields = ['location', 'company', 'is_active']
	search_fields = ['title', 'description', 'company', 'location']
