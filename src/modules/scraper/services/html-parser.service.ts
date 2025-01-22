import * as cheerio from 'cheerio';
import { Logger } from '../../shared/utils/logger';

export class HtmlParserService {
  private readonly selector: string;

  constructor(selector: string = 'div.cell.large-12 img') {
    this.selector = selector;
  }

  public extractImageUrl(html: string): string {
    try {
      const $ = cheerio.load(html);
      const imgElement = $(this.selector).last();
      const imageUrl = imgElement.attr('src');

      if (!imageUrl) {
        throw new Error('Menu image not found in HTML content');
      }

      Logger.debug(`Image URL extracted: ${imageUrl}`);
      return imageUrl;
    } catch (error) {
      Logger.error('Failed to extract image URL from HTML', error as Error);
      throw error;
    }
  }
} 