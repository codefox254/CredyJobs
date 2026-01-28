from rest_framework import serializers
from .models import BlogPost, Comment


# Serializer for comments
class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'name', 'text', 'date', 'blog']

# BlogPost serializer with nested comments
class BlogPostSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = BlogPost
        fields = '__all__'
