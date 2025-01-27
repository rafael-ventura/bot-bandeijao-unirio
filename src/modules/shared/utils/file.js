const fs = require('fs');
const path = require('path');
const Logger = require('./logger.js');

class FileUtils {
  static async ensureDirectoryExists(dirPath) {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      Logger.debug(`Directory created: ${dirPath}`);
    }
  }

  static async writeFile(filePath, data) {
    await FileUtils.ensureDirectoryExists(path.dirname(filePath));
    await fs.promises.writeFile(filePath, data);
    Logger.debug(`File written: ${filePath}`);
  }
}

module.exports = FileUtils;
