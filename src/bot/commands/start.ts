import { Context } from 'telegraf';
import { Logger } from '../../utils/logger';

export async function handleStart(ctx: Context): Promise<void> {
  try {
    await ctx.reply(
      'Bem-vindo ao Vai Bandeijar! 🍽️\n\n' +
      'Aqui você pode:\n' +
      '• Ver o cardápio da semana 📋\n' +
      '• Se inscrever para receber atualizações 🔔\n' +
      '• Consultar preços e horários ⏰\n\n' +
      'Use /help para ver todos os comandos disponíveis.'
    );
    Logger.info(`User ${ctx.from?.id} started the bot`);
  } catch (error) {
    Logger.error('Error handling start command', error as Error);
  }
} 