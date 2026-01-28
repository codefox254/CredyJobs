import scrapy

class OpenedCareerSpider(scrapy.Spider):
    name = "openedcareer"
    allowed_domains = ["openedcareer.com"]
    start_urls = ["https://openedcareer.com/category/jobs/"]

    def parse(self, response):
        for job in response.css('div.job-listing'):
            yield {
                'title': job.css('h2.job-title::text').get(),
                'company': job.css('div.company::text').get(),
                'location': job.css('span.location::text').get(),
                'description': job.css('div.description::text').get(),
                'apply_url': job.css('a.apply-btn::attr(href)').get(),
                'image': job.css('img.company-logo::attr(src)').get(),
            }
        next_page = response.css('a.next-page::attr(href)').get()
        if next_page:
            yield response.follow(next_page, self.parse)
