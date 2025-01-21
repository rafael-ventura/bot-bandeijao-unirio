import { Logger } from '../utils/logger';
import { ScrapingResult } from './types/scraper.types';
import path from 'path';
import fs from 'fs';
import * as cheerio from 'cheerio';

export class MenuScraper {
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
      const imageResponse = await fetch(imageUrl);
      if (!imageResponse.ok) {
        throw new Error(`Failed to download image: ${imageResponse.statusText}`);
      }

      const buffer = await imageResponse.arrayBuffer();
      const fileName = `cardapio_${dateStr.replace(/\s+/g, '-')}.jpg`;
      const savePath = path.join(process.cwd(), 'cardapiosHist', fileName);

      await fs.promises.writeFile(savePath, Buffer.from(buffer));
      
      return {
        weekId: dateStr,
        savedPath: savePath
      };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to scrape menu: ${errorMessage}`);
    }
  }
} 