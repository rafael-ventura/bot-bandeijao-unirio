import { google } from 'googleapis';
import { Logger } from '../../utils/logger';
import { ProcessedMenuData, GoogleSheetsConfig } from '../types/scraper.types';

export class GoogleSheetsService {
  private readonly config: GoogleSheetsConfig;

  constructor(config: GoogleSheetsConfig) {
    this.config = config;
  }

  public async saveMenuData(data: ProcessedMenuData): Promise<void> {
    try {
      const auth = await this.getAuth();
      const sheets = google.sheets({ version: 'v4', auth });
      
      const values = this.formatDataForSheets(data);
      
      await sheets.spreadsheets.values.append({
        spreadsheetId: this.config.spreadsheetId,
        range: this.config.sheetName,
        valueInputOption: 'RAW',
        requestBody: {
          values
        }
      });

      Logger.info('Menu data saved to Google Sheets successfully');
    } catch (error) {
      Logger.error('Failed to save data to Google Sheets', error as Error);
      throw error;
    }
  }

  private async getAuth() {
    // TODO: Implementar autenticação com Google Sheets API
    return null;
  }

  private formatDataForSheets(data: ProcessedMenuData): string[][] {
    // TODO: Implementar formatação dos dados para planilha
    return [];
  }
} 