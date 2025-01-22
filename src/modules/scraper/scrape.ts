import { Logger } from '../shared/utils/logger'
import { ScrapingResult } from './types/scraper.types';
import { ImageDownloaderService } from './services/image-downloader.service';
import path from 'path';
import fs from 'fs';
import * as cheerio from 'cheerio';

class MenuScraper {
  private readonly RESTAURANT_URL = 'https://www.unirio.br/prae/nutricao-prae-1/setan/restaurante-escola';

  public async scrapeMenu(): Promise<ScrapingResult> {
    try {
      Logger.info('Fetching restaurant page...');
      const response = await fetch(this.RESTAURANT_URL);
      const html = await response.text();

      // Usar Cheerio para parse do HTML
      const $ = cheerio.load(html);
      
      // Buscar a imagem do cardápio usando o seletor específico
      const menuImage = $('#parent-fieldname-text-f70fdc45550a457293b7aae9cc35d0fb img.image-inline');
      
      if (!menuImage.length) {
        throw new Error('Menu image not found in restaurant page');
      }

      const imageUrl = menuImage.attr('src');
      const dateStr = menuImage.attr('alt'); // Ex: "21 a 24-01-25"
      
      if (!imageUrl || !dateStr) {
        throw new Error('Image URL or date not found');
      }

      Logger.info(`Found menu image: ${imageUrl}`);

      // Baixar a imagem
      const imageDownloader = new ImageDownloaderService({ outputDir: path.join(__dirname, '../../../data/history') });
      const savedPath = await imageDownloader.downloadImage(imageUrl, `cardapio_${dateStr.replace(/\s+/g, '-')}.jpg`);

      return {
        weekId: dateStr,
        savedPath: savedPath
      };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to scrape menu: ${errorMessage}`);
    }
  }
}

if (require.main === module) {
  const scraper = new MenuScraper();
  scraper.scrapeMenu()
    .then(result => Logger.info(`Menu image saved successfully: ${JSON.stringify(result)}`))
    .catch(() => process.exit(1));
}

export { MenuScraper }; 