class Logger {
  static formatMessage(level, message) {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level}] ${message}`;
  }

  static info(message) {
    console.log(Logger.formatMessage('INFO', message));
  }

  static warn(message) {
    console.warn(Logger.formatMessage('WARN', message));
  }

  static error(message, error) {
    console.error(Logger.formatMessage('ERROR', message));
    if (error) {
      console.error(error);
    }
  }

  static debug(message) {
    if (process.env.NODE_ENV === 'development') {
      console.debug(Logger.formatMessage('DEBUG', message));
    }
  }
}

module.exports = Logger;
