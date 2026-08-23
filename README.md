# Vai Bandeijar?

![image](https://github.com/user-attachments/assets/70ba7824-0061-4adc-aae9-8633fb3c2be0)

Scrapes UNIRIO's student restaurant (Restaurante Escola) weekly menu and publishes it — an Angular site, plus a scheduled Telegram post and weekly email.

## Context
The site (Angular) shows the latest scraped menu image. Behind it, a small .NET console app runs on a weekly GitHub Actions schedule: it scrapes the menu from UNIRIO's site, commits the image back to the repo, and can notify a Telegram chat and a mailing list.

## Tech Stack
- **Frontend**: Angular 19, PrimeNG
- **Backend**: .NET 8 console app (`src/VaiBandeijar`) — AngleSharp for HTML parsing, `HttpClient` for the Telegram Bot API, `System.Net.Mail` for the weekly email
- **Automation**: GitHub Actions (scheduled scrape + notify)

## Status
- **Scraping**: working, runs every Monday via `.github/workflows/scrape.yml`.
- **Telegram notification** and **weekly email**: implemented, including the real HTML email template, but disabled by default (`Telegram:Enabled` / `Email:Enabled` are `false`) since they haven't been tested against live credentials yet. Turn them on by setting the `TELEGRAM_ENABLED` / `EMAIL_ENABLED` repository variables and the matching secrets (bot token, chat id, SMTP credentials) once you're ready.

## Running the backend locally
```bash
cd src/VaiBandeijar
dotnet run
```

## Running the frontend
```bash
npm install
ng serve
```

## Testing
```bash
dotnet test
```
Covers the HTML-parsing logic and the email template rendering — the parts that don't need live network calls or credentials.
