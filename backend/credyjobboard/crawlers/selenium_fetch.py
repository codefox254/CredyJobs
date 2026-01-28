from selenium import webdriver
from selenium.webdriver.firefox.options import Options

options = Options()
options.add_argument('--headless')

driver = webdriver.Firefox(options=options)
driver.get('https://openedcareer.com/category/jobs/')

# Example: print page title and first 500 chars of page source
print(driver.title)
print(driver.page_source[:500])

driver.quit()
