export interface ScrapingResult {
  weekId: string;
  savedPath: string;
}

export interface ImageDownloadOptions {
  outputDir: string;
  baseUrl?: string;
} 