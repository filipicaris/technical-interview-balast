import { Injectable } from '@nestjs/common';
import { Logger, createLogger, format, transports } from 'winston';

@Injectable()
export class WinstonAdapter {
  private readonly logger: Logger;
  constructor() {
    const winstonFormat = format.combine(
      format.splat(),
      format.colorize(),
      format.simple(),
    );

    this.logger = createLogger({
      level: 'info',
      format: winstonFormat,
      transports: [new transports.Console()],
    });
  }

  static create(): WinstonAdapter {
    return new WinstonAdapter();
  }

  getLogger() {
    return this.logger;
  }
}
