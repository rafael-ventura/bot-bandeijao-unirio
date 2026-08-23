using VaiBandeijar.Notifications;
using Xunit;

namespace VaiBandeijar.Tests;

public class WeeklyEmailTemplateTests
{
    private const string Template = """
        <body>
            <!-- Template será preenchido dinamicamente -->
            <a href="{{unsubscribeLink}}">Unsubscribe</a>
        </body>
        """;

    [Fact]
    public void Render_EmbedsTheWeekLabelAndImageContentId()
    {
        var html = WeeklyEmailTemplate.Render(Template, "21-a-24-01-25", "weekly-menu", "https://example.com/unsubscribe");

        Assert.Contains("21-a-24-01-25", html);
        Assert.Contains("cid:weekly-menu", html);
        Assert.Contains("https://example.com/unsubscribe", html);
    }

    [Fact]
    public void Render_FallsBackToAPlaceholderLink_WhenUnsubscribeUrlIsEmpty()
    {
        var html = WeeklyEmailTemplate.Render(Template, "week", "cid", string.Empty);

        Assert.Contains("href=\"#\"", html);
    }
}
