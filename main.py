from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import urllib.request
from decouple import config

# Configuração do webdriver
chrome_options = webdriver.ChromeOptions()
chrome_options.binary_location = 'C:\\Users\\raf4a\\Downloads\\chrome-win64\\chrome-win64\\chrome.exe'

# Inicialização do webdriver
browser = webdriver.Chrome(options=chrome_options)

# Acessar o Instagram e logar
browser.get("https://www.instagram.com/accounts/login/")
time.sleep(5)

# Login no Instagram (substitua 'your_username' e 'your_password' com suas credenciais)
username_field = browser.find_element(By.NAME, 'username')
password_field = browser.find_element(By.NAME, 'password')
login_button = browser.find_element(By.XPATH, '//*[@id="loginForm"]/div/div[3]/button/div')


username_field.send_keys(config('NOME')) 
password_field.send_keys(config('PASSWORD'))
login_button.click()

# # Esperar pela navegação pós-login e redirecionamento para o feed
# WebDriverWait(browser, 10).until(
#     EC.presence_of_element_located((By.XPATH, '//div[contains(@class, " _ac7v _aang")]'))
# )
time.sleep(10)
browser.get("https://www.instagram.com/fotochapando")

time.sleep(10)
# Navegar para a página do perfil desejado
profile_url = "https://www.instagram.com/restaurante_escola_unirio/"
browser.get(profile_url)
# WebDriverWait(browser, 10).until(
#     EC.presence_of_element_located((By.XPATH, '//div[contains(@class, "_aa_7")]'))
# )
time.sleep(10)
# Encontrar a primeira foto fixada e clicar
first_photo = browser.find_element(By.XPATH, '/html/body/div[2]/div/div/div[2]/div/div/div/div[1]/div[1]/div[2]/div[2]/section/main/div/div[3]/article/div[1]/div/div[1]/div[1]/a')
linkfirst_photo= first_photo.get_attribute('href')
browser.get(linkfirst_photo)

# Esperar para que o modal da imagem abra e obter o URL do post
WebDriverWait(browser, 10).until(
    EC.presence_of_element_located((By.XPATH, '//div[contains(@class, "_aagw")]'))
)
post_url = browser.current_url

# Abrir o post em uma nova guia
browser.execute_script("window.open(arguments[0]);", post_url)
time.sleep(2)

# Alternar para a nova guia aberta com o post
browser.switch_to.window(browser.window_handles[1])
WebDriverWait(browser, 10).until(
    EC.presence_of_element_located((By.XPATH, '/html/body/div[1]/section/main/div/div/article/div[2]/div/div/div[2]/div/div/div/ul/li[2]/div/div/div/div[1]/img'))
)

# Encontrar a imagem dentro do post e obter o URL da imagem
image = browser.find_element(By.XPATH, '/html/body/div[1]/section/main/div/div/article/div[2]/div/div/div[2]/div/div/div/ul/li[2]/div/div/div/div[1]/img')
image_url = image.get_attribute('src')

# Baixar a imagem
urllib.request.urlretrieve(image_url, "foto_do_post.jpg")

# Fechar a guia do post e voltar para a guia original
browser.close()
browser.switch_to.window(browser.window_handles[0])

# Fechar o navegador
browser.quit()
