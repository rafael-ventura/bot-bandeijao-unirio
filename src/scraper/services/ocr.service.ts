import { createWorker } from 'tesseract.js';
import { Logger } from '../../utils/logger';
import { WeeklyMenu, DailyMenu } from '../../types/menu.types';
import * as fs from 'fs';
import path from 'path';

export class OCRService {
  public async processMenu(imagePath: string): Promise<WeeklyMenu> {
    try {
      Logger.info('Starting OCR processing');
      const text = await this.extractText(imagePath);
      const weeklyMenu = await this.parseMenuText(text, imagePath);
      
      // Salvar JSON do cardápio
      await this.saveMenuJson(weeklyMenu);
      
      return weeklyMenu;
    } catch (error) {
      Logger.error('Failed to process menu', error as Error);
      throw error;
    }
  }

  private async extractText(imagePath: string): Promise<string> {
    const worker = await createWorker();
    await worker.loadLanguage('por');
    await worker.initialize('por');
    
    const { data: { text } } = await worker.recognize(imagePath);
    await worker.terminate();
    
    return text;
  }

  private async parseMenuText(text: string, imagePath: string): Promise<WeeklyMenu> {
    const lines = text.split('\n').map(line => line.trim()).filter(Boolean);
    const weekId = path.basename(imagePath).replace('cardapio_', '').replace('.jpg', '');
    
    // Encontrar cabeçalhos das datas
    const dateHeaders = lines.filter(line => 
      /^(Segunda|Terça|Quarta|Quinta|Sexta)-feira/.test(line)
    );

    const days: DailyMenu[] = dateHeaders.map(header => {
      const dateMatch = header.match(/\d{2}\/\d{2}/);
      const date = dateMatch ? dateMatch[0] : '';
      
      // Encontrar índice do cabeçalho atual
      const headerIndex = lines.indexOf(header);
      const nextHeaderIndex = lines.findIndex((line, i) => 
        i > headerIndex && /^(Segunda|Terça|Quarta|Quinta|Sexta)-feira/.test(line)
      );
      
      // Pegar todas as linhas até o próximo cabeçalho
      const dayLines = lines.slice(
        headerIndex + 1, 
        nextHeaderIndex === -1 ? undefined : nextHeaderIndex
      );

      // Verificar se é feriado
      const isHoliday = dayLines.some(line => 
        /feriado|recesso/i.test(line)
      );

      return {
        date,
        items: this.parseDayItems(dayLines),
        isHoliday
      };
    });

    return {
      weekId,
      imagePath,
      days,
      processedAt: new Date()
    };
  }

  private parseDayItems(lines: string[]): DailyMenu['items'] {
    return {
      omnivorous: this.findDish(lines, 'Opção Onívora'),
      vegetarian: this.findDish(lines, 'Opção Vegetariana'),
      salad: this.findDish(lines, 'Salada'),
      accompaniment: this.findAccompaniments(lines),
      dessert: this.findItem(lines, 'Sobremesa'),
      juice: this.findItem(lines, 'Refresco')
    };
  }

  private findDish(lines: string[], category: string): MenuItem | undefined {
    const line = lines.find(l => l.includes(category));
    if (!line) return undefined;

    const dish = line.split(':')[1]?.trim();
    const isHoliday = /^[A-Z]$/.test(dish || '');

    return {
      dish: dish || '',
      isHoliday
    };
  }

  private findAccompaniments(lines: string[]): string[] {
    const startIndex = lines.findIndex(l => l.includes('Acompanhamentos'));
    if (startIndex === -1) return [];

    const accompaniments: string[] = [];
    for (let i = startIndex + 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line || /Sobremesa|Refresco/.test(line)) break;
      accompaniments.push(line);
    }

    return accompaniments;
  }

  private findItem(lines: string[], category: string): string | undefined {
    const line = lines.find(l => l.includes(category));
    return line?.split(':')[1]?.trim();
  }

  private async saveMenuJson(menu: WeeklyMenu): Promise<void> {
    const jsonPath = path.join(
      process.cwd(), 
      'cardapiosHist', 
      `cardapio_${menu.weekId}.json`
    );
    
    await fs.promises.writeFile(
      jsonPath, 
      JSON.stringify(menu, null, 2)
    );
    
    Logger.info(`Menu JSON saved to: ${jsonPath}`);
  }
} 