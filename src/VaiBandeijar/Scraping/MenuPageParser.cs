using AngleSharp;
using AngleSharp.Dom;

namespace VaiBandeijar.Scraping;

/// <summary>
/// Pure HTML-parsing logic, kept separate from the HTTP calls so it can be unit tested
/// against fixed HTML without hitting the network.
/// </summary>
public class MenuPageParser
{
    private readonly IBrowsingContext _context = BrowsingContext.New(Configuration.Default);

    public async Task<string?> FindMenuPageLinkAsync(string restaurantPageHtml)
    {
        var document = await _context.OpenAsync(req => req.Content(restaurantPageHtml));
        var link = document.QuerySelectorAll("a")
            .FirstOrDefault(a => (a.GetAttribute("href") ?? string.Empty).Contains("CardpioRE"));
        return link?.GetAttribute("href");
    }

    public async Task<string?> FindMenuImageUrlAsync(string menuPageHtml)
    {
        var document = await _context.OpenAsync(req => req.Content(menuPageHtml));
        var image = document.QuerySelector("img") as IElement;
        return image?.GetAttribute("src");
    }
}
