import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export class HttpClient {
  private static defaultHeaders = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  };

  public static async get<T>(url: string, config?: AxiosRequestConfig<any>): Promise<T> {
    const response: AxiosResponse<T> = await axios.get(url, {
      headers: { ...this.defaultHeaders, ...config?.headers },
      ...config
    });
    return response.data;
  }
} 