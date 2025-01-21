import { createWorker } from 'tesseract.js';
import { Logger } from '../../utils/logger';

export class OCRService {
  public async extractText(imagePath: string): Promise<string> {
    try {
      const worker = await createWorker('por');
      const { data: { text } } = await worker.recognize(imagePath);
      await worker.terminate();
      
      return text;
    } catch (error) {
      Logger.error('Failed to extract text from image', error as Error);
      throw error;
    }
  }
} 