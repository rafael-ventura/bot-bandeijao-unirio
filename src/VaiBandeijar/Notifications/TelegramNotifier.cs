using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using VaiBandeijar.Options;

namespace VaiBandeijar.Notifications;

/// <summary>
/// Posts the scraped menu photo to a configured Telegram chat via the Bot API.
/// This runs once per scheduled job (matching how the workflow actually executes),
/// rather than as a long-lived polling bot.
/// </summary>
public class TelegramNotifier : ITelegramNotifier
{
    private readonly HttpClient _httpClient;
    private readonly TelegramOptions _options;
    private readonly ILogger<TelegramNotifier> _logger;

    public TelegramNotifier(HttpClient httpClient, IOptions<TelegramOptions> options, ILogger<TelegramNotifier> logger)
    {
        _httpClient = httpClient;
        _options = options.Value;
        _logger = logger;
    }

    public async Task SendMenuAsync(byte[] imageBytes, string caption)
    {
        if (!_options.Enabled)
        {
            _logger.LogInformation("Telegram notifications are disabled; skipping.");
            return;
        }

        using var content = new MultipartFormDataContent
        {
            { new StringContent(_options.ChatId), "chat_id" },
            { new StringContent(caption), "caption" },
            { new ByteArrayContent(imageBytes), "photo", "cardapio.jpg" }
        };

        var response = await _httpClient.PostAsync($"https://api.telegram.org/bot{_options.BotToken}/sendPhoto", content);

        if (!response.IsSuccessStatusCode)
        {
            var body = await response.Content.ReadAsStringAsync();
            throw new InvalidOperationException($"Failed to send Telegram message: {response.StatusCode} — {body}");
        }

        _logger.LogInformation("Menu photo sent to Telegram chat {ChatId}", _options.ChatId);
    }
}
