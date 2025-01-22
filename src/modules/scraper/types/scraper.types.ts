export interface ScrapingResult {
  weekId: string;
  savedPath: string;
  assetsPath: string;
}

export interface ImageDownloadOptions {
  outputDir: string;
  baseUrl?: string;
} 