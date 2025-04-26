import { Injectable, Scope } from '@nestjs/common';
import { Logger } from 'winston';

import { WinstonAdapter } from './winston.adapter';

@Injectable({ scope: Scope.TRANSIENT })
export class WinstonLogger {
  private readonly logger: Logger;
  private context = 'default';

  constructor(private readonly winstonAdapter: WinstonAdapter) {
    this.logger = this.winstonAdapter.getLogger();
  }

  log(level: string, message: string, ...meta: unknown[]): void {
    meta.push(this.getContext());
    this.logger.log(level, message, ...meta);
  }

  info(message: string, ...meta: unknown[]): void {
    meta.push(this.getContext());
    this.logger.info(message, ...meta);
  }

  warn(message: string, ...meta: unknown[]): void {
    meta.push(this.getContext());
    this.logger.warn(message, ...meta);
  }

  error(message: string, ...meta: unknown[]): void {
    meta.push(this.getContext());
    this.logger.error(message, ...meta);
  }

  request(
    level: string,
    elapsedMs: number,
    method: string,
    path: string,
    statusCode: number,
  ) {
    this.logger.log(
      level,
      `HTTP "${method}" "${path}" responded ${statusCode} in ${elapsedMs} ms`,
      this.getContext(),
    );
  }

  setContext(context: string) {
    this.context = context;
  }

  private getContext() {
    return { context: this.context };
  }
}
