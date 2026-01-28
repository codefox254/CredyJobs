import requests
from bs4 import BeautifulSoup
from .models import CrawlSource, CrawledJob
from django.utils import timezone
from django.core.files.base import ContentFile
import re
import time
import random
import mimetypes
import os
import logging

logger = logging.getLogger("credyjobboard.crawler")


def crawl_openedcareer(source=None):
    """
    Crawl jobs from openedcareer.com
    """
    BASE_URL = "https://openedcareer.com"
    start_url = f"{BASE_URL}/category/jobs/"
    
    # Initialize session
    session = requests.Session()
    session.headers.update({'User-Agent': 'Mozilla/5.0 (compatible; CredyJobsBot/1.0)'})
    
    # Initialize variables
    from .models import CrawlReport, CrawlProgress
    job_data_list = []
    next_page = start_url
    page_count = 0
    max_pages = 24
    seen_jobs = set()
    errors = []
    jobs_found = 0
    jobs_updated = 0
    
    # Create crawl report
    report = CrawlReport.objects.create(source=source)
    
    # Main crawling loop
    while next_page and page_count < max_pages:
        try:
            resp = session.get(next_page, timeout=30)
            resp.raise_for_status()
        except Exception as e:
            logger.error(f"[CRAWLER PAGE ERROR] {next_page}: {e}")
            errors.append(str(e))
            break
        
        # Parse page
        soup = BeautifulSoup(resp.text, 'html.parser')
        
        # Extract job links
        job_links = [a['href'] for a in soup.select('a') if a.get('href') and '/job/' in a['href']]
        job_links = [BASE_URL + link if link.startswith('/') else link for link in job_links]
        job_links = [link for link in job_links if link not in seen_jobs]
        seen_jobs.update(job_links)
        
        job_titles = []
        
        # Process each job
        for idx, job_url in enumerate(job_links):
            try:
                resp = session.get(job_url, timeout=30)
                resp.raise_for_status()
                logger.info(f"Extracting job: {job_url}")
            except Exception as e:
                logger.error(f"[CRAWLER ERROR] {job_url}: {e}")
                errors.append(str(e))
                continue
            
            # Parse job page
            soup = BeautifulSoup(resp.text, 'html.parser')
            
            # Extract title
            title = soup.find('h1')
            title = title.get_text(strip=True) if title else ''
            
            # Extract text content
            text = soup.get_text(" ", strip=True)
            
            # Initialize fields
            company = ''
            location = ''
            description = ''
            image_url = None
            
            # Extract company
            m = re.search(r'at ([\w\s\-&]+) \u2022', text)
            if m:
                company = m.group(1).strip()
            
            # Extract location
            m = re.search(r'Location: ([^\u2022]+) \u2022', text)
            if m:
                location = m.group(1).strip()
            
            # Extract description from paragraphs
            paragraphs = [p.get_text(strip=True) for p in soup.find_all('p') if len(p.get_text(strip=True)) > 50]
            if paragraphs:
                description = paragraphs[0]
            
            # Extract image
            img_tag = soup.find('img')
            if img_tag and img_tag.has_attr('src'):
                image_url = img_tag['src']
                if not image_url.startswith('http'):
                    image_url = BASE_URL + image_url
            
            # Create job data dictionary
            job_data = {
                'title': title,
                'company': company,
                'location': location,
                'apply_url': job_url,
                'description': description,
                'source': source,
            }
            
            # Download and attach image if available
            if image_url:
                try:
                    img_resp = session.get(image_url, timeout=15)
                    img_resp.raise_for_status()
                    ext = mimetypes.guess_extension(img_resp.headers.get('content-type', '').split(';')[0]) or '.jpg'
                    fname = os.path.basename(image_url.split('?')[0])
                    if not fname.endswith(ext):
                        fname += ext
                    job_data['image'] = ContentFile(img_resp.content, name=fname)
                except Exception as e:
                    logger.warning(f"[CRAWLER IMAGE] Could not fetch image: {image_url} - {e}")
                    errors.append(str(e))
            
            # Add to list
            job_data_list.append(job_data)
            job_titles.append(title)
            
            # Update progress
            percent = int((idx + 1) / len(job_links) * 100) if job_links else 100
            CrawlProgress.set(source.id if source else 0, percent, job_titles[:])
            
            # Random delay to avoid rate limiting
            time.sleep(random.uniform(0.5, 2.0))
        
        # Clear progress after processing all jobs on page
        CrawlProgress.clear(source.id if source else 0)
        
        # Find next page
        next_btn = soup.find('a', text=lambda t: t and 'Next' in t)
        if next_btn and next_btn.get('href'):
            next_page = BASE_URL + next_btn['href'] if next_btn['href'].startswith('/') else next_btn['href']
        else:
            next_page = None
        
        page_count += 1
        
        # Delay between pages
        time.sleep(random.uniform(5, 30))
    
    # Save crawled jobs to database
    from .models import Job
    now = timezone.now()
    posted_count = 0
    updated_count = 0
    
    for job in job_data_list:
        # Check if job already exists
        exists = CrawledJob.objects.filter(
            title=job['title'],
            company=job['company'],
            location=job['location'],
            is_approved=False,
            is_rejected=False
        ).exists()
        
        if not exists:
            # Create new crawled job
            crawled = CrawledJob.objects.create(**job)
            jobs_found += 1
            
            # Auto-post if found within last 24 hours
            if (now - crawled.date_found).total_seconds() <= 86400:
                Job.objects.create(
                    title=crawled.title,
                    company=crawled.company or '',
                    location=crawled.location or '',
                    apply_url=crawled.apply_url,
                    description=crawled.description or '',
                    is_active=True
                )
                posted_count += 1
        else:
            updated_count += 1
    
    # Update report
    report.finished_at = timezone.now()
    report.jobs_found = jobs_found
    report.jobs_updated = updated_count
    report.errors = '\n'.join(errors)
    report.summary = f"Found: {jobs_found}, Updated: {updated_count}, Posted: {posted_count}"
    report.save()
    
    return posted_count


def run_all_crawlers():
    """
    Run all active crawlers with time limit
    """
    sources = CrawlSource.objects.filter(is_active=True)
    total_posted = 0
    start_time = time.time()
    max_duration = 600  # 10 minutes
    
    for source in sources:
        # Check if we've exceeded time limit
        if time.time() - start_time > max_duration:
            print("[CRAWLER] Max crawl duration reached (10 min). Stopping.")
            break
        
        # Run appropriate crawler based on URL
        if 'openedcareer.com' in source.url:
            total_posted += crawl_openedcareer(source=source)
        # Add more site-specific crawlers here
    
    return total_posted