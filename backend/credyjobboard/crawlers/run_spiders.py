from scrapy.crawler import CrawlerProcess
from credyjobboard.crawlers.openedcareer_spider import OpenedCareerSpider


def run_openedcareer_spider():
    process = CrawlerProcess(settings={
        'FEEDS': {
            'openedcareer_jobs.json': {'format': 'json'},
        },
    })
    process.crawl(OpenedCareerSpider)
    process.start()

if __name__ == "__main__":
    run_openedcareer_spider()
