import { Logger } from '../../shared/utils/logger';
import path from 'path';
import fs from 'fs';

interface ImageDownloaderConfig {
  outputDir: string;
}

export class ImageDownloaderService {
  private readonly outputDir: string;
  private readonly assetsDir: string;
  private readonly indexPath: string;

  constructor(config: ImageDownloaderConfig) {
    this.outputDir = config.outputDir;
    this.assetsDir = path.join(__dirname, '../../../modules/web/vai-bandeijar/src/assets/cardapios');
    this.indexPath = path.join(this.assetsDir, 'index.json');
    this.ensureDirectoriesExist();
  }

  private ensureDirectoriesExist() {
    [this.outputDir, this.assetsDir].forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });

    // Criar index.json se não existir
    if (!fs.existsSync(this.indexPath)) {
      fs.writeFileSync(this.indexPath, '[]');
    }
  }

  private updateIndex(newFilename: string) {
    try {
      let files: string[] = [];
      
      // Ler index atual
      if (fs.existsSync(this.indexPath)) {
        files = JSON.parse(fs.readFileSync(this.indexPath, 'utf-8'));
      }

      // Adicionar novo arquivo se não existir
      if (!files.includes(newFilename)) {
        files.push(newFilename);
      }

      // Salvar index atualizado
      fs.writeFileSync(this.indexPath, JSON.stringify(files, null, 2));
      Logger.info(`Updated index.json with ${newFilename}`);
    } catch (error) {
      Logger.error('Failed to update index.json', error as Error);
    }
  }

  public async downloadImage(url: string, filename: string): Promise<{ historyPath: string, assetsPath: string }> {
    try {
      const response = await fetch(url);
      const buffer = await response.arrayBuffer();

      // Salvar na pasta histórica
      const historyPath = path.join(this.outputDir, filename);
      fs.writeFileSync(historyPath, Buffer.from(buffer));
      Logger.info(`Image saved to history: ${historyPath}`);

      // Salvar na pasta de assets
      const assetsPath = path.join(this.assetsDir, filename);
      fs.writeFileSync(assetsPath, Buffer.from(buffer));
      Logger.info(`Image saved to assets: ${assetsPath}`);

      // Atualizar o arquivo latest.jpg na pasta de assets
      const latestPath = path.join(this.assetsDir, 'latest.jpg');
      fs.copyFileSync(assetsPath, latestPath);
      Logger.info(`Updated latest.jpg in assets`);

      // Atualizar index.json
      this.updateIndex(filename);

      return {
        historyPath,
        assetsPath
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to download image: ${errorMessage}`);
    }
  }
} 