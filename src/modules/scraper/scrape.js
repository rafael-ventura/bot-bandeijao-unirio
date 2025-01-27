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
      const response = await fetch(this.RESTAURANT_URL);
      const html = await response.text();

      const $ = cheerio.load(html);
      const menuImage = $('#parent-fieldname-text-f70fdc45550a457293b7aae9cc35d0fb img.image-inline');

      if (!menuImage.length) {
        throw new Error('Menu image not found in restaurant page');
      }

      const imageUrl = menuImage.attr('src');
      const dateStr = menuImage.attr('alt');

      if (!imageUrl || !dateStr) {
        throw new Error('Image URL or date not found');
      }

      Logger.info(`Found menu image: ${imageUrl}`);

      const imageDownloader = new ImageDownloaderService({
        outputDir: 'cardapiosHist' // Caminho para o histórico
      });

      const { historyPath, assetsPath } = await imageDownloader.downloadImage(
        imageUrl,
        `cardapio_${dateStr.replace(/\s+/g, '-')}.jpg`
      );

      return { weekId: dateStr, savedPath: historyPath, assetsPath: assetsPath };
    } catch (error) {
      Logger.error(`Failed to scrape menu: ${error.message}`);
      throw error;
    }
  }
}

module.exports = MenuScraper;
