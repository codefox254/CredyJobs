from rest_framework import viewsets
from .models import BlogPost, Comment
from .serializers import BlogPostSerializer, CommentSerializer

class BlogPostViewSet(viewsets.ModelViewSet):
	queryset = BlogPost.objects.all().order_by('-posted_at')
	serializer_class = BlogPostSerializer
	filterset_fields = ['is_published']
	search_fields = ['title', 'content']


# New CommentViewSet
from rest_framework import permissions
class CommentViewSet(viewsets.ModelViewSet):
	queryset = Comment.objects.all().order_by('-date')
	serializer_class = CommentSerializer
	permission_classes = [permissions.AllowAny]
