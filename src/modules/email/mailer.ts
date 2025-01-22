import nodemailer from 'nodemailer';
import { config } from '../config';
import { Logger } from '../utils/logger';
import { WeeklyMenu } from '../types/menu';

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.email.host,
      port: config.email.port,
      secure: config.email.port === 465,
      auth: {
        user: config.email.user,
        pass: config.email.pass,
      },
    });
  }

  async sendWeeklyMenu(to: string, menu: WeeklyMenu): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: `"Vai Bandeijar" <${config.email.user}>`,
        to,
        subject: `Cardápio da Semana - ${menu.week}`,
        html: await this.generateWeeklyMenuHtml(menu),
      });
      Logger.info(`Weekly menu sent to ${to}`);
    } catch (error) {
      Logger.error(`Failed to send email to ${to}`, error as Error);
      throw error;
    }
  }

  private async generateWeeklyMenuHtml(menu: WeeklyMenu): Promise<string> {
    // TODO: Implementar template HTML
    return '<h1>Cardápio da Semana</h1>';
  }
} 