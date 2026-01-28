
import scrapy
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from nlp_utils import (
    extract_entities, extract_skills, summarize_job, extract_top_nouns, extract_locations, extract_organizations, extract_dates, extract_emails,
    detect_language, semantic_similarity, parse_dates
)

class OpenedCareerSpider(scrapy.Spider):
    name = "openedcareer"
    allowed_domains = ["openedcareer.com"]
    start_urls = ["https://openedcareer.com/category/jobs/"]

    def parse(self, response):
        seen_descriptions = set()
        for job in response.css('div.job-listing'):
            description = job.css('div.description::text').get() or ''
            # Deduplicate by semantic similarity (skip if similar to any seen)
            is_duplicate = False
            for prev in seen_descriptions:
                if semantic_similarity(description, prev) > 0.95:
                    is_duplicate = True
                    break
            if is_duplicate:
                continue
            seen_descriptions.add(description)

            nlp_entities = extract_entities(description)
            nlp_skills = extract_skills(description)
            nlp_summary = summarize_job(description)
            nlp_nouns = extract_top_nouns(description)
            nlp_locations = extract_locations(description)
            nlp_orgs = extract_organizations(description)
            nlp_dates = extract_dates(description)
            nlp_emails = extract_emails(description)
            nlp_language = detect_language(description)
            nlp_parsed_dates = parse_dates(description)
            yield {
                'title': job.css('h2.job-title::text').get(),
                'company': job.css('div.company::text').get(),
                'location': job.css('div.location::text').get(),
                'description': description,
                'apply_url': job.css('a.apply-btn::attr(href)').get(),
                'image': job.css('img::attr(src)').get(),
                'nlp_entities': nlp_entities,
                'nlp_skills': nlp_skills,
                'nlp_summary': nlp_summary,
                'nlp_top_nouns': nlp_nouns,
                'nlp_locations': nlp_locations,
                'nlp_organizations': nlp_orgs,
                'nlp_dates': nlp_dates,
                'nlp_emails': nlp_emails,
                'nlp_language': nlp_language,
                'nlp_parsed_dates': [str(dt) for dt in nlp_parsed_dates],
            }
        next_page = response.css('a.next.page-numbers::attr(href)').get()
        if next_page:
            yield response.follow(next_page, self.parse)
