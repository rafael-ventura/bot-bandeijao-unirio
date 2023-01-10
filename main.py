import os.path
import os
from selenium import webdriver
import chromedriver_autoinstaller
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
import urllib

chromedriver_autoinstaller.install()
browser = webdriver.Chrome()

chrome_options = webdriver.Chrome_options()
chrome_options.binary_location = os.environ.get("GOOGLE_CHROME_BIN")
chrome_options.add_argument("--headless")
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")

browser = webdriver.Chrome(executable_path=os.environ.get("CHROMEDRIVER_PATH"),
                           options=chrome_options)
browser.get(
    "http://www.unirio.br/prae/nutricao-prae-1/setan/restaurante-escola")
browser.find_element(
    By.XPATH,
    '//*[@id="parent-fieldname-text-f70fdc45550a457293b7aae9cc35d0fb"]/p[25]/a/img'
).click()
windows = browser.window_handles
for w in windows:
    if (w != browser.current_window_handle):
        browser.switch_to.window(w)

img = browser.find_element(By.TAG_NAME, 'img')
src = img.get_attribute('src')

name = src.split("/")
semana = name[len(name) - 1]

urllib.request.urlretrieve(
    str(src),
    "C:/dev/autoBandeijao/bot-bandeijao-unirio/cardapiosHist/cardapio_{}.jpg".
    format(semana))

exec(open('C:/dev/autoBandeijao/bot-bandeijao-unirio/postOnTwitter.py').read())
