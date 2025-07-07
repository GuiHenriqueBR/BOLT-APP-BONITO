interface LogLevel {
  ERROR: 0;
  WARN: 1;
  INFO: 2;
  DEBUG: 3;
}

const LOG_LEVELS: LogLevel = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3,
};

const COLORS = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  green: '\x1b[32m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
};

class Logger {
  private logLevel: number;

  constructor() {
    const level = process.env.LOG_LEVEL?.toUpperCase() || 'INFO';
    this.logLevel = LOG_LEVELS[level as keyof LogLevel] ?? LOG_LEVELS.INFO;
  }

  private formatMessage(level: string, message: string, ...args: any[]): string {
    const timestamp = new Date().toISOString();
    const formattedArgs = args.length > 0 ? ' ' + args.map(arg => 
      typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
    ).join(' ') : '';
    
    return `[${timestamp}] [${level}] ${message}${formattedArgs}`;
  }

  private colorize(color: keyof typeof COLORS, text: string): string {
    if (process.env.NODE_ENV === 'production') {
      return text;
    }
    return `${COLORS[color]}${text}${COLORS.reset}`;
  }

  error(message: string, ...args: any[]): void {
    if (this.logLevel >= LOG_LEVELS.ERROR) {
      const formatted = this.formatMessage('ERROR', message, ...args);
      console.error(this.colorize('red', formatted));
    }
  }

  warn(message: string, ...args: any[]): void {
    if (this.logLevel >= LOG_LEVELS.WARN) {
      const formatted = this.formatMessage('WARN', message, ...args);
      console.warn(this.colorize('yellow', formatted));
    }
  }

  info(message: string, ...args: any[]): void {
    if (this.logLevel >= LOG_LEVELS.INFO) {
      const formatted = this.formatMessage('INFO', message, ...args);
      console.log(this.colorize('blue', formatted));
    }
  }

  debug(message: string, ...args: any[]): void {
    if (this.logLevel >= LOG_LEVELS.DEBUG) {
      const formatted = this.formatMessage('DEBUG', message, ...args);
      console.log(this.colorize('cyan', formatted));
    }
  }

  // Request logging helper
  request(req: any, res: any, responseTime?: number): void {
    const { method, url, ip } = req;
    const { statusCode } = res;
    const time = responseTime ? ` ${responseTime}ms` : '';
    
    const color = statusCode >= 400 ? 'red' : statusCode >= 300 ? 'yellow' : 'green';
    const message = `${method} ${url} ${statusCode}${time} - ${ip}`;
    
    this.info(this.colorize(color, message));
  }

  // Database query logging
  query(query: string, duration?: number): void {
    if (process.env.NODE_ENV === 'development') {
      const time = duration ? ` (${duration}ms)` : '';
      this.debug(this.colorize('magenta', `DB Query${time}: ${query}`));
    }
  }
}

export const logger = new Logger();