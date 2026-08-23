namespace VaiBandeijar.Notifications;

/// <summary>
/// Fills in the weekly.html template. Kept separate from the SMTP call so the
/// placeholder substitution can be unit tested without sending anything.
/// </summary>
public static class WeeklyEmailTemplate
{
    public static string Render(string templateHtml, string weekLabel, string menuImageCid, string unsubscribeUrl)
    {
        return templateHtml
            .Replace("<!-- Template será preenchido dinamicamente -->",
                $"""<div class="menu-day"><h2>{weekLabel}</h2><img src="cid:{menuImageCid}" alt="Cardápio da semana" style="max-width:100%;" /></div>""")
            .Replace("{{unsubscribeLink}}", string.IsNullOrEmpty(unsubscribeUrl) ? "#" : unsubscribeUrl);
    }
}
