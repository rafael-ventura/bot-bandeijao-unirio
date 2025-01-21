import { MenuScraper } from './scrape';
import { OCRService } from './services/ocr.service';
import { Logger } from '../utils/logger';

async function main() {
  try {
    Logger.info('Starting menu scraping');
    
    // 1. Scrape da imagem
    const scraper = new MenuScraper();
    const result = await scraper.scrapeMenu();
    Logger.info(`Menu image saved: ${result.savedPath}`);

    // 2. Processamento OCR
    const ocrService = new OCRService();
    const menuData = await ocrService.processMenu(result.savedPath);
    Logger.info('Menu processed successfully');

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    Logger.error('Failed to process menu:', errorMessage);
    process.exit(1);
  }
}

// Executar se for chamado diretamente
if (require.main === module) {
  main();
}

export { main }; 