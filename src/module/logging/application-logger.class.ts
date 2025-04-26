import { Injectable, LoggerService } from '@nestjs/common';
import { Logger } from 'winston';

import { WinstonAdapter } from './winston.adapter';

@Injectable()
export class ApplicationLogger implements LoggerService {
  private readonly logger: Logger;

  constructor(private readonly winstonAdapter: WinstonAdapter) {
    this.logger = winstonAdapter.getLogger();
  }

  log(message: string, context?: string) {
    this.logger.info(message, { context });
  }

  error(message: string, trace?: string, context?: string) {
    this.logger.error(message, { trace, context });
  }

  warn(message: string, context?: string) {
    this.logger.warn(message, { context });
  }

  debug?(message: string, context?: string) {
    this.logger.log('debug', message, { context });
  }

  verbose?(message: string, context?: string) {
    this.logger.log('verbose', message, { context });
  }

  infoStart(message: string, ...meta: unknown[]): void {
    meta.push({ context: 'StartUp' });
    this.logger.info(message, ...meta);
  }

  errorStart(message: string, ...meta: unknown[]): void {
    meta.push({ context: 'StartUp' });
    this.logger.error(message, ...meta);
  }

  static create(): ApplicationLogger {
    return new ApplicationLogger(new WinstonAdapter());
  }
}
