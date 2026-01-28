from bs4 import BeautifulSoup

def parse_jobs(html):
    soup = BeautifulSoup(html, 'html.parser')
    jobs = []
    for job in soup.select('div.job-listing'):
        jobs.append({
            'title': job.select_one('h2.job-title').get_text(strip=True) if job.select_one('h2.job-title') else None,
            'company': job.select_one('div.company').get_text(strip=True) if job.select_one('div.company') else None,
            'location': job.select_one('span.location').get_text(strip=True) if job.select_one('span.location') else None,
            'description': job.select_one('div.description').get_text(strip=True) if job.select_one('div.description') else None,
            'apply_url': job.select_one('a.apply-btn')['href'] if job.select_one('a.apply-btn') else None,
            'image': job.select_one('img.company-logo')['src'] if job.select_one('img.company-logo') else None,
        })
    return jobs
