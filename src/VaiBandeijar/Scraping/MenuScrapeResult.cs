namespace VaiBandeijar.Scraping;

public record MenuScrapeResult(string WeekId, byte[] ImageBytes, string HistoryPath, string AssetsPath);
