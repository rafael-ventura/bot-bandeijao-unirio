import { MenuScraper } from './scrape';
import { ImageProcessorService } from './services/image-processor.service';
import { GoogleSheetsService } from './services/google-sheets.service';
import { Logger } from '../utils/logger';
import { config } from '../config';

export class ScraperModule {
  private scraper: MenuScraper;
  private imageProcessor: ImageProcessorService;
  private sheetsService: GoogleSheetsService;

  constructor() {
    this.scraper = new MenuScraper();
    this.imageProcessor = new ImageProcessorService();
    this.sheetsService = new GoogleSheetsService(config.googleSheets);
  }

  public async execute(): Promise<void> {
    try {
      Logger.info('Starting scraping process');
      
      // 1. Scrape imagem
      const scrapingResult = await this.scraper.scrapeMenu();
      
      // 2. Processar imagem e extrair dados
      const processedData = await this.imageProcessor.processMenuImage(
        scrapingResult.savedPath,
        scrapingResult.weekId
      );
      
      // 3. Salvar dados na planilha
      await this.sheetsService.saveMenuData(processedData);
      
      Logger.info('Scraping process completed successfully');
    } catch (error) {
      Logger.error('Error in scraping process:', error as Error);
      throw error;
    }
  }
}

// Executar se for chamado diretamente (útil para testes e execução via CLI)
if (require.main === module) {
  const scraperModule = new ScraperModule();
  scraperModule.execute().catch(() => process.exit(1));
}

export { MenuScraper } from './scrape';
export * from './types/scraper.types'; 