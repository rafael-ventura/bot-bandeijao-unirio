using VaiBandeijar.Scraping;
using Xunit;

namespace VaiBandeijar.Tests;

public class MenuPageParserTests
{
    private readonly MenuPageParser _parser = new();

    [Fact]
    public async Task FindMenuPageLinkAsync_ReturnsTheHrefContainingCardpioRE()
    {
        const string html = """
            <html><body>
                <a href="/other-page">Other</a>
                <a href="/prae/CardpioRE-semana-12">Cardápio</a>
            </body></html>
            """;

        var link = await _parser.FindMenuPageLinkAsync(html);

        Assert.Equal("/prae/CardpioRE-semana-12", link);
    }

    [Fact]
    public async Task FindMenuPageLinkAsync_ReturnsNull_WhenNoMatchingLinkExists()
    {
        const string html = "<html><body><a href=\"/other-page\">Other</a></body></html>";

        var link = await _parser.FindMenuPageLinkAsync(html);

        Assert.Null(link);
    }

    [Fact]
    public async Task FindMenuImageUrlAsync_ReturnsTheImageSrc()
    {
        const string html = "<html><body><img src=\"/files/cardapio_21-a-24-01-25.jpg\" /></body></html>";

        var imageUrl = await _parser.FindMenuImageUrlAsync(html);

        Assert.Equal("/files/cardapio_21-a-24-01-25.jpg", imageUrl);
    }
}
