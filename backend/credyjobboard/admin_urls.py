from django.urls import path
from .crawler_admin import CrawlerDashboardAdmin

urlpatterns = [
    path('admin/crawler-dashboard/', CrawlerDashboardAdmin.dashboard_view, name='crawler-dashboard'),
    path('admin/crawler-dashboard/trigger-crawl/', CrawlerDashboardAdmin.trigger_crawl, name='trigger-crawl'),
]
