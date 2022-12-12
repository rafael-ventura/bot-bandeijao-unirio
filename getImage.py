import sys
import os.path
import os
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from subprocess import Popen
import urllib
import time
## Setup chrome options
chrome_options = Options()
chrome_options.add_argument("--headless")
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-gpu")

# Set path to chromedriver as per your configuration
homedir = os.path.expanduser("~")
webdriver_service = Service(f"{homedir}/chromedriver/stable/chromedriver")

# Choose Chrome Browser
browser = webdriver.Chrome(service=webdriver_service, options=chrome_options)
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
