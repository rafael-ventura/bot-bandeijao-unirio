using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using VaiBandeijar.Options;

namespace VaiBandeijar.Scraping;

/// <summary>
/// Follows the same two-hop path the restaurant's site requires: the landing page links to a
/// menu page, which in turn embeds the actual menu image.
/// </summary>
public class MenuScraper : IMenuScraper
{
    private const string BaseUrl = "https://www.unirio.br";

    private readonly HttpClient _httpClient;
    private readonly MenuPageParser _parser;
    private readonly ScraperOptions _options;
    private readonly ILogger<MenuScraper> _logger;

    public MenuScraper(HttpClient httpClient, MenuPageParser parser, IOptions<ScraperOptions> options, ILogger<MenuScraper> logger)
    {
        _httpClient = httpClient;
        _parser = parser;
        _options = options.Value;
        _logger = logger;

        _httpClient.DefaultRequestHeaders.UserAgent.ParseAdd(_options.UserAgent);
    }

    public async Task<MenuScrapeResult> ScrapeMenuAsync()
    {
        _logger.LogInformation("Fetching restaurant page...");
        var restaurantHtml = await _httpClient.GetStringAsync(_options.RestaurantUrl);

        var menuLink = await _parser.FindMenuPageLinkAsync(restaurantHtml)
                        ?? throw new InvalidOperationException("Menu link not found on the restaurant page.");
        var fullMenuLink = BaseUrl + menuLink;
        _logger.LogInformation("Found menu link: {Link}", fullMenuLink);

        var menuPageHtml = await _httpClient.GetStringAsync(fullMenuLink);
        var imageUrl = await _parser.FindMenuImageUrlAsync(menuPageHtml)
                        ?? throw new InvalidOperationException("Menu image not found after following the link.");
        var fullImageUrl = BaseUrl + imageUrl;
        _logger.LogInformation("Final menu image URL: {Url}", fullImageUrl);

        var imageBytes = await _httpClient.GetByteArrayAsync(fullImageUrl);
        var weekId = Path.GetFileNameWithoutExtension(imageUrl);
        var fileName = $"cardapio_{weekId}.jpg";

        var historyDir = Path.GetFullPath(_options.HistoryOutputDir);
        var assetsDir = Path.GetFullPath(_options.AssetsOutputDir);
        Directory.CreateDirectory(historyDir);
        Directory.CreateDirectory(assetsDir);

        var historyPath = Path.Combine(historyDir, fileName);
        var assetsPath = Path.Combine(assetsDir, fileName);
        await File.WriteAllBytesAsync(historyPath, imageBytes);
        await File.WriteAllBytesAsync(assetsPath, imageBytes);
        File.Copy(assetsPath, Path.Combine(assetsDir, "latest.jpg"), overwrite: true);
        UpdateIndex(assetsDir, fileName);

        _logger.LogInformation("Menu image saved: {HistoryPath}", historyPath);
        return new MenuScrapeResult(weekId, imageBytes, historyPath, assetsPath);
    }

    private void UpdateIndex(string assetsDir, string fileName)
    {
        var indexPath = Path.Combine(assetsDir, "index.json");
        var files = File.Exists(indexPath)
            ? System.Text.Json.JsonSerializer.Deserialize<List<string>>(File.ReadAllText(indexPath)) ?? new()
            : new List<string>();

        if (!files.Contains(fileName))
        {
            files.Add(fileName);
        }

        File.WriteAllText(indexPath, System.Text.Json.JsonSerializer.Serialize(files, new System.Text.Json.JsonSerializerOptions { WriteIndented = true }));
    }
}
