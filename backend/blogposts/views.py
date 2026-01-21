from rest_framework import viewsets
from .models import BlogPost
from .serializers import BlogPostSerializer

class BlogPostViewSet(viewsets.ModelViewSet):
	queryset = BlogPost.objects.all().order_by('-posted_at')
	serializer_class = BlogPostSerializer
	filterset_fields = ['is_published']
	search_fields = ['title', 'content']
