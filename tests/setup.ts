import dotenv from 'dotenv';
import path from 'path';

// Carregar variáveis de ambiente de teste
dotenv.config({ path: path.join(__dirname, '../.env.test') });

// Mock do logger para não poluir os logs durante testes
jest.mock('../src/utils/logger', () => ({
  Logger: {
    info: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
    warn: jest.fn(),
  }
})); 