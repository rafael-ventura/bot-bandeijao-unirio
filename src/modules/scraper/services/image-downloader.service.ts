import * as path from 'path';
import { Logger } from '../../shared/utils/logger';
import { HttpClient } from '../../shared/utils/http';
import { FileUtils } from '../../shared/utils/file';
import { ImageDownloadOptions } from '../types/scraper.types';

export class ImageDownloaderService {
  private readonly defaultOptions: ImageDownloadOptions = {
    baseUrl: 'https://www.unirio.br',
    outputDir: path.join(__dirname, '../../../data/history')
  };

  constructor(private options: ImageDownloadOptions) {
    this.options = { ...this.defaultOptions, ...options };
  }

  public async downloadImage(imageUrl: string, filename: string): Promise<string> {
    try {
      const fullImageUrl = this.getFullImageUrl(imageUrl);
      const imagePath = path.join(this.options.outputDir, filename);
      
      const imageData = await HttpClient.get<Buffer>(fullImageUrl, {
        responseType: 'arraybuffer'
      });
      
      await FileUtils.writeFile(imagePath, imageData);
      Logger.info(`Image saved successfully to: ${imagePath}`);

      return imagePath;
    } catch (error) {
      Logger.error('Failed to download image', error as Error);
      throw error;
    }
  }

  private getFullImageUrl(imageUrl: string): string {
    return imageUrl.startsWith('http') 
      ? imageUrl 
      : `${this.options.baseUrl}${imageUrl}`;
  }
} 