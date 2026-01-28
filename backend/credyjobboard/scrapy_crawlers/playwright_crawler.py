from playwright.sync_api import sync_playwright

def crawl_dynamic_jobs(url):
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto(url)
        jobs = page.query_selector_all('div.job-listing')
        results = []
        for job in jobs:
            results.append({
                'title': job.query_selector('h2.job-title').inner_text() if job.query_selector('h2.job-title') else None,
                'company': job.query_selector('div.company').inner_text() if job.query_selector('div.company') else None,
                'location': job.query_selector('span.location').inner_text() if job.query_selector('span.location') else None,
                'description': job.query_selector('div.description').inner_text() if job.query_selector('div.description') else None,
                'apply_url': job.query_selector('a.apply-btn').get_attribute('href') if job.query_selector('a.apply-btn') else None,
                'image': job.query_selector('img.company-logo').get_attribute('src') if job.query_selector('img.company-logo') else None,
            })
        browser.close()
        return results
