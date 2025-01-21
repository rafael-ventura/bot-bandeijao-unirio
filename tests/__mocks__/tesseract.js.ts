export const createWorker = jest.fn().mockImplementation(() => ({
  recognize: jest.fn().mockResolvedValue({ data: { text: 'Mocked OCR text' } }),
  terminate: jest.fn().mockResolvedValue(undefined)
})); 