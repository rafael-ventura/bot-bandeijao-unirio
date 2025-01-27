const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const Logger = require('../../shared/utils/logger');

class ImageDownloaderService {
  constructor(config) {
    this.outputDir = path.resolve(config.outputDir);
    this.assetsDir = path.resolve('src/assets/cardapios');
    this.indexPath = path.join(this.assetsDir, 'index.json');
    this.ensureDirectoriesExist();
  }

  ensureDirectoriesExist() {
    [this.outputDir, this.assetsDir].forEach((dir) => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        Logger.info(`Directory created: ${dir}`);
      }
    });

    if (!fs.existsSync(this.indexPath)) {
      fs.writeFileSync(this.indexPath, '[]');
      Logger.info(`Created index.json in assets folder`);
    }
  }

  updateIndex(newFilename) {
    try {
      const files = fs.existsSync(this.indexPath)
        ? JSON.parse(fs.readFileSync(this.indexPath, 'utf-8'))
        : [];
      if (!files.includes(newFilename)) files.push(newFilename);
      fs.writeFileSync(this.indexPath, JSON.stringify(files, null, 2));
      Logger.info(`Updated index.json with ${newFilename}`);
    } catch (error) {
      Logger.error('Failed to update index.json', error);
    }
  }

  async downloadImage(url, filename) {
    try {
      const response = await fetch(url);
      const buffer = await response.arrayBuffer();

      // Verificar tamanho da imagem
      if (Buffer.byteLength(buffer) < 1024 * 10) { // Exemplo: menor que 10 KB
        Logger.warn(`Image seems too small, check the URL: ${url}`);
      }

      const historyPath = path.join(this.outputDir, filename);
      fs.writeFileSync(historyPath, Buffer.from(buffer));
      Logger.info(`Image saved to history: ${historyPath}`);

      const assetsPath = path.join(this.assetsDir, filename);
      fs.writeFileSync(assetsPath, Buffer.from(buffer));
      Logger.info(`Image saved to assets: ${assetsPath}`);

      const latestPath = path.join(this.assetsDir, 'latest.jpg');
      fs.copyFileSync(assetsPath, latestPath);
      Logger.info(`Updated latest.jpg in assets`);

      this.updateIndex(filename);
      return { historyPath, assetsPath };
    } catch (error) {
      Logger.error(`Failed to download image: ${error.message}`);
      throw error;
    }
  }
}

module.exports = ImageDownloaderService;
