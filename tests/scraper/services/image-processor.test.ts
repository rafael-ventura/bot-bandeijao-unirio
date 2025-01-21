import { ImageProcessorService } from '../../../src/scraper/services/image-processor.service';
import { ImageEnhancer } from '../../../src/scraper/services/image-enhancer.service';
import { OCRService } from '../../../src/scraper/services/ocr.service';

// Mock das dependências
jest.mock('../../../src/scraper/services/image-enhancer.service');
jest.mock('../../../src/scraper/services/ocr.service');

describe('ImageProcessorService', () => {
  let processor: ImageProcessorService;
  const mockWeekId = '2024-W01';
  const mockImagePath = '/path/to/image.jpg';

  beforeEach(() => {
    processor = new ImageProcessorService();
    jest.clearAllMocks();
  });

  it('should process menu image successfully', async () => {
    // Arrange
    const mockEnhancedPath = '/path/to/enhanced.jpg';
    const mockExtractedText = 'Segunda-feira\nArroz, Feijão';
    
    (ImageEnhancer.prototype.enhance as jest.Mock).mockResolvedValue(mockEnhancedPath);
    (OCRService.prototype.extractText as jest.Mock).mockResolvedValue(mockExtractedText);

    // Act
    const result = await processor.processMenuImage(mockImagePath, mockWeekId);

    // Assert
    expect(result.weekId).toBe(mockWeekId);
    expect(result.imagePath).toBe(mockImagePath);
    expect(result.menuItems).toBeDefined();
    expect(ImageEnhancer.prototype.enhance).toHaveBeenCalledWith(mockImagePath);
    expect(OCRService.prototype.extractText).toHaveBeenCalledWith(mockEnhancedPath);
  });

  it('should handle processing errors', async () => {
    // Arrange
    const mockError = new Error('Enhancement failed');
    (ImageEnhancer.prototype.enhance as jest.Mock).mockRejectedValue(mockError);

    // Act & Assert
    await expect(processor.processMenuImage(mockImagePath, mockWeekId))
      .rejects.toThrow('Enhancement failed');
  });
}); 