using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using VaiBandeijar.Notifications;
using VaiBandeijar.Options;
using VaiBandeijar.Scraping;

var builder = Host.CreateApplicationBuilder(args);

builder.Services.Configure<ScraperOptions>(builder.Configuration.GetSection(ScraperOptions.SectionName));
builder.Services.Configure<TelegramOptions>(builder.Configuration.GetSection(TelegramOptions.SectionName));
builder.Services.Configure<EmailOptions>(builder.Configuration.GetSection(EmailOptions.SectionName));

builder.Services.AddHttpClient<IMenuScraper, MenuScraper>();
builder.Services.AddHttpClient<ITelegramNotifier, TelegramNotifier>();
builder.Services.AddSingleton<MenuPageParser>();
builder.Services.AddSingleton<IEmailNotifier, EmailNotifier>();

using var host = builder.Build();

var logger = host.Services.GetRequiredService<ILogger<Program>>();
var scraper = host.Services.GetRequiredService<IMenuScraper>();
var telegram = host.Services.GetRequiredService<ITelegramNotifier>();
var email = host.Services.GetRequiredService<IEmailNotifier>();

try
{
    var result = await scraper.ScrapeMenuAsync();

    await telegram.SendMenuAsync(result.ImageBytes, $"Cardápio da semana ({result.WeekId}) 🍽️");
    await email.SendWeeklyMenuAsync(result.ImageBytes, result.WeekId);

    logger.LogInformation("Run complete.");
}
catch (Exception ex)
{
    logger.LogError(ex, "Run failed.");
    Environment.Exit(1);
}

// Exposed for the test project.
public partial class Program { }
