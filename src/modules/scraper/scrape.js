const fetch = require('node-fetch');
const cheerio = require('cheerio');
const path = require('path');
const Logger = require('../shared/utils/logger');
const ImageDownloaderService = require('./services/image-downloader.service.js');

class MenuScraper {
  constructor() {
    this.RESTAURANT_URL = 'https://www.unirio.br/prae/nutricao-prae-1/setan/restaurante-escola';
  }

  async scrapeMenu() {
    try {
      Logger.info('Fetching restaurant page...');
      const response = await fetch(this.RESTAURANT_URL, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
        }
      });
      const html = await response.text();

      const $ = cheerio.load(html);

      // 🔥 Encontra o link para o cardápio (agora um <a> ao invés de <img>)
      const menuLink = $('a[href*="CardpioRE"]').attr('href');

      if (!menuLink) {
        throw new Error('Menu link not found on the page');
      }

      const fullMenuLink = `https://www.unirio.br${menuLink}`;
      Logger.info(`Found menu link: ${fullMenuLink}`);

      // 🔥 Baixa a página do link para pegar a imagem real
      const menuResponse = await fetch(fullMenuLink, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
        }
      });
      const menuHtml = await menuResponse.text();
      const $$ = cheerio.load(menuHtml);

      // 🔥 Encontra a URL real da imagem dentro da página do cardápio
      const imageUrl = $$('img').attr('src');

      if (!imageUrl) {
        throw new Error('Menu image not found after following the link');
      }

      const fullImageUrl = `https://www.unirio.br${imageUrl}`;
      Logger.info(`Final menu image URL: ${fullImageUrl}`);

      // 🔥 Nomeia a imagem
      const dateStr = path.basename(imageUrl, path.extname(imageUrl));
      const imageDownloader = new ImageDownloaderService({
        outputDir: 'cardapiosHist'
      });

      const { historyPath, assetsPath } = await imageDownloader.downloadImage(
        fullImageUrl,
        `cardapio_${dateStr}.jpg`
      );

      return { weekId: dateStr, savedPath: historyPath, assetsPath: assetsPath };
    } catch (error) {
      Logger.error(`Failed to scrape menu: ${error.message}`);
      throw error;
    }
  }
}

module.exports = MenuScraper;
