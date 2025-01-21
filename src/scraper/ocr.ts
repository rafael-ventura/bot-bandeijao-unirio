import * as tesseract from 'tesseract.js';
import { WeeklyMenu, DailyMenu } from '../types/menu';

export class MenuOCR {
  async processImage(imagePath: string): Promise<WeeklyMenu> {
    try {
      const worker = await tesseract.createWorker('por');
      const { data: { text } } = await worker.recognize(imagePath);
      await worker.terminate();

      return this.parseMenuText(text, imagePath);
    } catch (error) {
      console.error('Error processing image:', error);
      throw error;
    }
  }

  private parseMenuText(text: string, imagePath: string): WeeklyMenu {
    // Implementar parser do texto para estrutura WeeklyMenu
    // Este é um placeholder - precisamos implementar a lógica real
    return {
      week: this.getCurrentWeekId(),
      days: [],
      imageUrl: imagePath
    };
  }

  private getCurrentWeekId(): string {
    const date = new Date();
    return `${date.getFullYear()}-W${this.getWeekNumber(date)}`;
  }

  private getWeekNumber(date: Date): number {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  }
} 