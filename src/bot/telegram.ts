import { Telegraf } from 'telegraf';
import { config } from '../config';
import { Logger } from '../utils/logger';

export class TelegramBot {
  private bot: Telegraf;

  constructor() {
    this.bot = new Telegraf(config.telegram.botToken);
    this.setupCommands();
  }

  private setupCommands(): void {
    this.bot.command('start', this.handleStart.bind(this));
    this.bot.command('menu', this.handleMenu.bind(this));
    this.bot.command('subscribe', this.handleSubscribe.bind(this));
  }

  private async handleStart(ctx: any): Promise<void> {
    Logger.info('New user started the bot');
    await ctx.reply('Bem-vindo ao Vai Bandeijar! 🍽️\nUse /menu para ver o cardápio desta semana.');
  }

  private async handleMenu(ctx: any): Promise<void> {
    // TODO: Implementar lógica para mostrar o menu
    await ctx.reply('Em breve você poderá ver o cardápio aqui!');
  }

  private async handleSubscribe(ctx: any): Promise<void> {
    // TODO: Implementar lógica de inscrição
    await ctx.reply('Em breve você poderá se inscrever para receber atualizações!');
  }

  public async start(): Promise<void> {
    try {
      await this.bot.launch();
      Logger.info('Telegram bot started successfully');
    } catch (error) {
      Logger.error('Failed to start Telegram bot', error as Error);
      throw error;
    }
  }
} 