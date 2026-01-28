import sys
import os
import django
import time
from datetime import datetime, timedelta

# Setup Django environment
def setup_django():
    sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'credyjobs.settings')
    django.setup()

def get_due_sources():
    from credyjobboard.models import CrawlSource
    now = datetime.now()
    due_sources = []
    for source in CrawlSource.objects.filter(is_active=True):
        # Manual sources are never due
        if source.frequency == 'manual':
            continue
        # Custom cron (not implemented here)
        if source.frequency == 'custom':
            continue
        # If next_run is not set, run now
        if not source.next_run or source.next_run <= now:
            due_sources.append(source)
    return due_sources

def update_next_run(source):
    from credyjobboard.models import CrawlSource
    now = datetime.now()
    freq = source.frequency
    next_run = now
    if freq == '5min':
        next_run += timedelta(minutes=5)
    elif freq == '10min':
        next_run += timedelta(minutes=10)
    elif freq == '30min':
        next_run += timedelta(minutes=30)
    elif freq == 'hourly':
        next_run += timedelta(hours=1)
    elif freq == 'daily':
        next_run += timedelta(days=1)
    elif freq == 'weekly':
        next_run += timedelta(weeks=1)
    elif freq == 'monthly':
        next_run += timedelta(days=30)
    elif freq == 'quarterly':
        next_run += timedelta(days=90)
    elif freq == 'yearly':
        next_run += timedelta(days=365)
    else:
        next_run = None
    source.next_run = next_run
    source.save(update_fields=["next_run"])

def run_due_crawlers():
    from credyjobboard.crawler import crawl_openedcareer
    due_sources = get_due_sources()
    for source in due_sources:
        print(f"[CRAWLER] Running: {source.name} ({source.url})")
        if 'openedcareer.com' in source.url:
            crawl_openedcareer(source=source)
        update_next_run(source)
    print(f"[CRAWLER] {len(due_sources)} sources crawled.")

def main():
    setup_django()
    run_due_crawlers()

if __name__ == "__main__":
    main()
