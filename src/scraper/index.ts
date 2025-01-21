import { MenuScraper } from './scrape';
import { Logger } from '../utils/logger';

async function main() {
  try {
    Logger.info('Starting scraping process');
    
    const scraper = new MenuScraper();
    const result = await scraper.scrapeMenu();
    
    Logger.info('Scraping completed successfully', {
      savedPath: result.savedPath
    });
  } catch (error) {
    Logger.error('Error in scraping process:', error as Error);
    process.exit(1);
  }
}

// Executar se for chamado diretamente
if (require.main === module) {
  main();
}

export { main }; 