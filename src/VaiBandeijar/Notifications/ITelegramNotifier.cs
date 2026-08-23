namespace VaiBandeijar.Notifications;

public interface ITelegramNotifier
{
    Task SendMenuAsync(byte[] imageBytes, string caption);
}
