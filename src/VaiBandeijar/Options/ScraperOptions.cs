namespace VaiBandeijar.Options;

public class ScraperOptions
{
    public const string SectionName = "Scraper";

    public string RestaurantUrl { get; set; } = "https://www.unirio.br/prae/nutricao-prae-1/setan/restaurante-escola";
    public string HistoryOutputDir { get; set; } = "cardapiosHist";
    public string AssetsOutputDir { get; set; } = "src/assets/cardapios";
    public string UserAgent { get; set; } =
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36";
}
