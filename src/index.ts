import * as dotenv from 'dotenv';
import {scrapeMenuImage} from './scrape';
import {extractTextFromImage} from './ocr';
import axios from 'axios';
import { Logger } from './utils/logger';
import { MenuScraper } from './scraper';
import { config } from './config';

dotenv.config();

export async function sendWhatsAppMessage(message: string) {
    const productId = process.env.MAYTAPI_PRODUCT_ID; // Seu Product ID da Maytapi
    const phoneId = process.env.MAYTAPI_PHONE_ID; // Seu Phone ID da Maytapi
    const token = process.env.MAYTAPI_TOKEN; // Seu token da Maytapi
    const url = `https://api.maytapi.com/api/${productId}/${phoneId}/sendMessage`;

    const data = {
        "message": message,
        "to_number": "120363204759413821@newsletter", // ID do canal de transmissão
        "type": "channel_text"
    };

    await axios.post(url, data, {
        headers: {
            'Content-Type': 'application/json',
            'x-maytapi-key': token,
        },
    });
}

async function main() {
    try {
        // 1. Scraping da imagem do cardápio
        const imagePath = await scrapeMenuImage();
        console.log('Imagem do cardápio obtida com sucesso.');

        // 2. Extração do texto da imagem
        const extractedText = await extractTextFromImage(imagePath);
        console.log('Texto extraído da imagem com sucesso.');

        // 3. Formatação da mensagem
        const additionalInfo = `
*VALORES:*
- R$3,00 para estudantes de graduação (*) e acompanhantes de PCD (**);
- R$10,66 para estudantes de pós-graduação;
- R$19,64 para servidores, funcionários terceirizados e visitantes (previamente autorizados pela PRAE).

*Horários das Refeições:*
- *Almoço:* 11h às 14h
- *Jantar:* 17h às 20h

_O uso das carteirinhas emitidas via Portal de Identificação acelera o acesso ao Restaurante e auxilia na diminuição do tempo de fila._
`;

        const message = `*Cardápio do Bandejão - ${new Date().toLocaleDateString()}*\n\n${extractedText}\n${additionalInfo}`;

        // 4. Envio da mensagem via Maytapi
        await sendWhatsAppMessage(message);
        console.log('Mensagem enviada com sucesso no WhatsApp.');
    } catch (error) {
        console.error('Erro:', error);
    }
}

main();

class Application {
  constructor() {
    this.setupErrorHandlers();
  }

  private setupErrorHandlers(): void {
    process.on('uncaughtException', (error) => {
      Logger.error('Uncaught Exception:', error);
      process.exit(1);
    });

    process.on('unhandledRejection', (reason) => {
      Logger.error('Unhandled Rejection:', reason as Error);
      process.exit(1);
    });
  }

  public async start(): Promise<void> {
    try {
      Logger.info('Starting application...');
      
      // TODO: Inicializar outros módulos quando necessário
      // - Bot do Telegram
      // - Serviço de Email
      // etc...

    } catch (error) {
      Logger.error('Failed to start application:', error as Error);
      throw error;
    }
  }
}

// Executar se for chamado diretamente
if (require.main === module) {
  const app = new Application();
  app.start().catch(() => process.exit(1));
}

export { Application };
