namespace VaiBandeijar.Notifications;

public interface IEmailNotifier
{
    Task SendWeeklyMenuAsync(byte[] imageBytes, string weekLabel);
}
