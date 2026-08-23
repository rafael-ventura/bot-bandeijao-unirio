using System.Net;
using System.Net.Mail;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using VaiBandeijar.Options;

namespace VaiBandeijar.Notifications;

public class EmailNotifier : IEmailNotifier
{
    private const string ImageContentId = "weekly-menu";

    private readonly EmailOptions _options;
    private readonly ILogger<EmailNotifier> _logger;

    public EmailNotifier(IOptions<EmailOptions> options, ILogger<EmailNotifier> logger)
    {
        _options = options.Value;
        _logger = logger;
    }

    public async Task SendWeeklyMenuAsync(byte[] imageBytes, string weekLabel)
    {
        if (!_options.Enabled)
        {
            _logger.LogInformation("Email notifications are disabled; skipping.");
            return;
        }

        var templatePath = Path.Combine(AppContext.BaseDirectory, "Templates", "weekly.html");
        var templateHtml = await File.ReadAllTextAsync(templatePath);
        var html = WeeklyEmailTemplate.Render(templateHtml, weekLabel, ImageContentId, _options.UnsubscribeUrl);

        using var message = new MailMessage { From = new MailAddress(_options.FromAddress), Subject = $"Cardápio da semana — {weekLabel}", IsBodyHtml = true };
        foreach (var recipient in _options.Recipients)
        {
            message.To.Add(recipient);
        }

        var view = AlternateView.CreateAlternateViewFromString(html, null, "text/html");
        var imageResource = new LinkedResource(new MemoryStream(imageBytes), "image/jpeg") { ContentId = ImageContentId };
        view.LinkedResources.Add(imageResource);
        message.AlternateViews.Add(view);

        using var client = new SmtpClient(_options.SmtpHost, _options.SmtpPort)
        {
            EnableSsl = true,
            Credentials = new NetworkCredential(_options.SmtpUser, _options.SmtpPassword)
        };

        await client.SendMailAsync(message);
        _logger.LogInformation("Weekly menu email sent to {Count} recipient(s)", _options.Recipients.Count);
    }
}
