import { Logger } from '../../utils/logger';
import { ProcessedMenuData } from '../types/scraper.types';
import { ImageEnhancer } from './image-enhancer.service';
import { OCRService } from './ocr.service';

export class ImageProcessorService {
  private readonly imageEnhancer: ImageEnhancer;
  private readonly ocrService: OCRService;

  constructor() {
    this.imageEnhancer = new ImageEnhancer();
    this.ocrService = new OCRService();
  }

  public async processMenuImage(imagePath: string, weekId: string): Promise<ProcessedMenuData> {
    try {
      Logger.info('Starting image processing');
      
      // Melhorar qualidade da imagem
      const enhancedImagePath = await this.imageEnhancer.enhance(imagePath);
      
      // Extrair texto via OCR
      const extractedText = await this.ocrService.extractText(enhancedImagePath);
      
      // Processar texto em dados estruturados
      const menuData = await this.parseMenuText(extractedText, weekId, imagePath);
      
      return menuData;
    } catch (error) {
      Logger.error('Failed to process menu image', error as Error);
      throw error;
    }
  }

  private async parseMenuText(text: string, weekId: string, imagePath: string): Promise<ProcessedMenuData> {
    // TODO: Implementar parser do texto para estrutura ProcessedMenuData
    return {
      weekId,
      imagePath,
      processedDate: new Date(),
      menuItems: []
    };
  }
} 