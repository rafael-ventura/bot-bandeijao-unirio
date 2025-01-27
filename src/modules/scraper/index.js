const Logger = require('../shared/utils/logger');
const MenuScraper = require('./scrape');

async function main() {
  try {
    Logger.info('Starting complete menu scraping process');

    // 1. Download da imagem
    const scraper = new MenuScraper();
    const result = await scraper.scrapeMenu();
    Logger.info(`Menu image downloaded: ${result.savedPath}`);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    Logger.error('Failed to complete menu scraping process:', error);
    process.exit(1);
  }
}

// Executar se for chamado diretamente
if (require.main === module) {
  main();
}

module.exports = main;
