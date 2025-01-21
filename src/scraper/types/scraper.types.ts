export interface ScrapingResult {
  imageUrl: string;
  weekId: string;
  savedPath: string;
}

export interface ImageDownloadOptions {
  userAgent?: string;
  baseUrl?: string;
  outputDir: string;
}

export interface ProcessedMenuData {
  weekId: string;
  imagePath: string;
  processedDate: Date;
  menuItems: {
    date: string;
    items: {
      category: string;
      description: string;
    }[];
  }[];
}

export interface GoogleSheetsConfig {
  spreadsheetId: string;
  sheetName: string;
} 