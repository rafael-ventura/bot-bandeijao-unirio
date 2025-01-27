const axios = require('axios');

class HttpClient {
  static defaultHeaders = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  };

  static async get(url, config = {}) {
    const response = await axios.get(url, {
      headers: { ...HttpClient.defaultHeaders, ...config.headers },
      ...config
    });
    return response.data;
  }
}

module.exports = HttpClient;
