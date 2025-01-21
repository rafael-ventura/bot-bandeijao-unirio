import { MenuScraper } from '../../src/scraper/scrape';
import { HttpClient } from '../../src/utils/http';
import { FileUtils } from '../../src/utils/file';
import path from 'path';

// Mock das dependências
jest.mock('../../src/utils/http');
jest.mock('../../src/utils/file');

describe('MenuScraper', () => {
  let scraper: MenuScraper;
  const mockHtml = `
    <div class="cell large-12">
      <img src="/path/to/menu.jpg" />
    </div>
  `;

  beforeEach(() => {
    scraper = new MenuScraper();
    // Limpar todos os mocks
    jest.clearAllMocks();
  });

  it('should successfully scrape menu image', async () => {
    // Arrange
    const mockImageUrl = '/path/to/menu.jpg';
    const mockImageBuffer = Buffer.from('fake-image-data');
    
    // Mock do HttpClient
    (HttpClient.get as jest.Mock).mockImplementation((url: string, config?: any) => {
      if (config?.responseType === 'arraybuffer') {
        return Promise.resolve(mockImageBuffer);
      }
      return Promise.resolve(mockHtml);
    });

    // Act
    const result = await scraper.scrapeMenu();

    // Assert
    expect(result.imageUrl).toBe(mockImageUrl);
    expect(result.weekId).toMatch(/\d{4}-W\d{2}/); // formato YYYY-WXX
    expect(result.savedPath).toContain('menu-');
    expect(HttpClient.get).toHaveBeenCalledTimes(2);
    expect(FileUtils.writeFile).toHaveBeenCalledTimes(1);
  });

  it('should throw error when image is not found', async () => {
    // Arrange
    const htmlWithoutImage = '<div class="cell large-12"></div>';
    (HttpClient.get as jest.Mock).mockResolvedValue(htmlWithoutImage);

    // Act & Assert
    await expect(scraper.scrapeMenu()).rejects.toThrow('Menu image not found');
  });
}); 