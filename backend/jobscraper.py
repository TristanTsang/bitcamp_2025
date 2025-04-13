import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup

# Define your job search query
job_query = "AI Intern"

# Setup headless browser
options = Options()
options.add_argument("--headless")
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")

# Start Chrome driver using webdriver-manager
service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service, options=options)

# Build Bing search URL
url = f"https://www.bing.com/search?q={job_query.replace(' ', '+')}"
driver.get(url)
time.sleep(3)

# Use BeautifulSoup to parse page content
soup = BeautifulSoup(driver.page_source, "html.parser")
results = soup.select(".b_algo h2 a")

# Define job posting filters
job_sites = ["myworkdayjobs.com"]
job_keywords = ["/jobs", "/job/", "/careers", "apply", "position", "openings"]

# Filter links based on domain and keywords
job_links = []
for a in results:
    href = a.get("href", "")
    text = a.text.strip()
    if any(site in href for site in job_sites) or any(kw in href for kw in job_keywords):
        job_links.append((text, href))

# Output
print(f"Filtered job listings for: '{job_query}'\n")
for i, (title, link) in enumerate(job_links, 1):
    print(f"{i}. {title}\n   {link}\n")

# Clean up
driver.quit()
