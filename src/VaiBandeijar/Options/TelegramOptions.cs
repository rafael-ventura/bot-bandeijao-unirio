namespace VaiBandeijar.Options;

public class TelegramOptions
{
    public const string SectionName = "Telegram";

    public bool Enabled { get; set; }
    public string BotToken { get; set; } = string.Empty;
    public string ChatId { get; set; } = string.Empty;
}
