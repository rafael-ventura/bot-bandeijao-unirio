import axios from 'axios';
import { Logger } from '../utils/logger';
import { DateUtils } from '../utils/date';
import { HtmlParserService } from './services/html-parser.service';
import { ImageDownloaderService } from './services/image-downloader.service';
import { ScrapingResult } from './types/scraper.types';

export class MenuScraper {
  private readonly UNIRIO_MENU_URL = 'https://www.unirio.br/prae/nutricao-prae-1/setan/restaurante-escola';
  private readonly htmlParser: HtmlParserService;
  private readonly imageDownloader: ImageDownloaderService;

  constructor() {
    this.htmlParser = new HtmlParserService();
    this.imageDownloader = new ImageDownloaderService({
      outputDir: 'data/history'
    });
  }

  public async scrapeMenu(): Promise<ScrapingResult> {
    try {
      Logger.info('Starting menu scraping process');
      
      const html = await this.fetchPage();
      const imageUrl = this.htmlParser.extractImageUrl(html);
      const weekId = DateUtils.getCurrentWeekId();
      const filename = `menu-${weekId}.jpg`;
      
      const savedPath = await this.imageDownloader.downloadImage(imageUrl, filename);

      return {
        imageUrl,
        weekId,
        savedPath
      };
    } catch (error) {
      Logger.error('Error in scraping process', error as Error);
      throw error;
    }
  }

  private async fetchPage(): Promise<string> {
    try {
      const response = await axios.get(this.UNIRIO_MENU_URL);
      Logger.debug('Page fetched successfully');
      return response.data;
    } catch (error) {
      Logger.error('Failed to fetch page', error as Error);
      throw error;
    }
  }
} 