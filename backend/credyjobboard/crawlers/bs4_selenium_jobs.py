from selenium import webdriver
from selenium.webdriver.firefox.options import Options
from bs4 import BeautifulSoup

options = Options()
options.add_argument('--headless')

driver = webdriver.Firefox(options=options)
driver.get('https://openedcareer.com/category/jobs/')

soup = BeautifulSoup(driver.page_source, 'html.parser')

# Example: print all job titles found in h2.job-title
for h2 in soup.select('h2.job-title'):
    print(h2.get_text(strip=True))

driver.quit()
