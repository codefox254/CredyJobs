import scrapy

class JobsBaseSpider(scrapy.Spider):
    """Base spider for job crawling, to be extended for each source."""
    custom_settings = {
        'DOWNLOAD_DELAY': 1,
        'CONCURRENT_REQUESTS': 2,
        'ROBOTSTXT_OBEY': True,
    }

    def parse_job(self, response):
        raise NotImplementedError
