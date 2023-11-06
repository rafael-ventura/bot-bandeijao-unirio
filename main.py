import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from decouple import config
import requests

# Configuração do webdriver
chrome_options = webdriver.ChromeOptions()
chrome_options.binary_location = 'C:\\Users\\raf4a\\Downloads\\chrome-win64\\chrome-win64\\chrome.exe'

# Inicialização do webdriver
browser = webdriver.Chrome(options=chrome_options)

# Acessar o site
browser.get("https://www.instagram.com/restaurante_escola_unirio/")

# Adicionando uma espera explícita para garantir que a página carregue
element = WebDriverWait(browser, 10).until(
    EC.presence_of_element_located((By.XPATH, '/html/body/div[2]/div/div/div[2]/div/div/div/div[1]/div[2]/section/main/div/div[3]/article/div[1]/div/div[1]/div[1]/a/div[1]/div[2]'))
)

time.sleep(5)

# Crie uma instância de ActionChains
actions = ActionChains(browser)

# Realiza a ação de clicar
actions.key_down(Keys.CONTROL).click(element).key_up(Keys.CONTROL).perform()

# Aguarda um pouco antes de tentar encontrar os campos de login
time.sleep(2)

# Encontra os campos de entrada do nome de usuário e da senha, e o botão de login
username_field = browser.find_element_by_xpath('/html/body/div[6]/div[1]/div/div[2]/div/div/div/div/div[2]/div/div[2]/div/div/div[1]/div[2]/form/div[1]/div[1]/div')
password_field = browser.find_element_by_xpath('//*[@id="loginForm"]/div[1]/div[2]/div')
login_button = browser.find_element_by_xpath('//*[@id="loginForm"]/div[1]/div[3]')

# Preenche os campos de nome de usuário e senha
username_field.send_keys(config('USERNAME')) 
password_field.send_keys('PASSWORD') 

# Clica no botão de login
login_button.click()

# Aguarda a página carregar após o login
time.sleep(5)

# Se uma nova guia foi aberta
if len(browser.window_handles) > 1:
    # Mude para a nova guia
    browser.switch_to.window(browser.window_handles[1])

    # Encontrar a imagem
    img = browser.find_element(By.TAG_NAME, 'img')
    src = img.get_attribute('src')

    # Baixe a imagem
    response = requests.get(src)
    if response.status_code == 200:
        with open('imagem.jpg', 'wb') as file:
            file.write(response.content)
    else:
        print(f'Não foi possível baixar a imagem: {response.status_code}')
else:
    print(f'Não foi possível abrir uma nova guia após {max_attempts} tentativas.')
    
    

browser.quit()