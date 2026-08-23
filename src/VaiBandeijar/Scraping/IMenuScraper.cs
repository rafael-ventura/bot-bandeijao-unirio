namespace VaiBandeijar.Scraping;

public interface IMenuScraper
{
    Task<MenuScrapeResult> ScrapeMenuAsync();
}
