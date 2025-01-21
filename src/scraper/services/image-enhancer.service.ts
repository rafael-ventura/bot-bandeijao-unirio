import sharp from 'sharp';
import { Logger } from '../../utils/logger';

export class ImageEnhancer {
  public async enhance(imagePath: string): Promise<string> {
    try {
      const enhancedPath = imagePath.replace('.jpg', '-enhanced.jpg');
      
      await sharp(imagePath)
        .grayscale()
        .normalize()
        .sharpen()
        .toFile(enhancedPath);

      return enhancedPath;
    } catch (error) {
      Logger.error('Failed to enhance image', error as Error);
      throw error;
    }
  }
} 