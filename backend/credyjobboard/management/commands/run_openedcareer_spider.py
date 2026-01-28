# This file allows running Scrapy spiders from Django management
from django.core.management.base import BaseCommand
from credyjobboard.crawlers.run_spiders import run_openedcareer_spider

class Command(BaseCommand):
    help = 'Run Scrapy spider for OpenedCareer jobs.'

    def handle(self, *args, **options):
        run_openedcareer_spider()
        self.stdout.write(self.style.SUCCESS('OpenedCareer spider finished.'))
