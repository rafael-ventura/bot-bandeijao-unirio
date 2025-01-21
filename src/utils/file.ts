import * as fs from 'fs';
import * as path from 'path';
import { Logger } from './logger';

export class FileUtils {
  public static async ensureDirectoryExists(dirPath: string): Promise<void> {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      Logger.debug(`Directory created: ${dirPath}`);
    }
  }

  public static async writeFile(filePath: string, data: Buffer | string): Promise<void> {
    await this.ensureDirectoryExists(path.dirname(filePath));
    await fs.promises.writeFile(filePath, data);
    Logger.debug(`File written: ${filePath}`);
  }
} 