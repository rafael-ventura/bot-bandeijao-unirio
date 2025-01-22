import { Logger } from '../shared/utils/logger'
import { MenuScraper } from './scrape';

async function main() {
  try {
    Logger.info('Starting complete menu scraping process');
    
    // 1. Download da imagem
    const scraper = new MenuScraper();
    const result = await scraper.scrapeMenu();
    Logger.info(`Menu image downloaded: ${result.savedPath}`);

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    Logger.error('Failed to complete menu scraping process:', error as Error);
    process.exit(1);
  }
}

// Executar se for chamado diretamente
if (require.main === module) {
  main();
}

export { main }; 