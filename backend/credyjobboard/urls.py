from .views import crawl_progress_view
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import AdvertViewSet, JobViewSet

router = DefaultRouter()
router.register(r'api/adverts', AdvertViewSet, basename='advert')
router.register(r'api/jobs', JobViewSet, basename='job')

urlpatterns = [
    path('admin/crawl-progress/', crawl_progress_view, name='crawl_progress'),
    path('', include(router.urls)),
    path('', include('credyjobboard.admin_urls')),
]
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import AdvertViewSet, JobViewSet


router = DefaultRouter()
router.register(r'api/adverts', AdvertViewSet, basename='advert')
router.register(r'api/jobs', JobViewSet, basename='job')

urlpatterns = [
    path('', include(router.urls)),
    path('', include('credyjobboard.admin_urls')),
]
