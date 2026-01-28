from django.core.management.base import BaseCommand
from credyjobboard.crawler import run_all_crawlers

class Command(BaseCommand):
    help = 'Run all job crawlers for active sources.'

    def handle(self, *args, **options):
        total = run_all_crawlers()
        self.stdout.write(self.style.SUCCESS(f'All crawlers executed. {total} jobs found.'))