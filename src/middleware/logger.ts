import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LogsDto } from './logs.dto';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, path: url } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('close', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');

      const data: LogsDto = {
        statusCode,
        userAgent,
        url,
        method,
        contentLength,
        ip,
      };
      this.filter(data);
    });

    next();
  }

  private filter(data: LogsDto) {
    const msg = `${data.method} ${data.url} ${data.statusCode} ${data.contentLength} - ${data.userAgent} ${data.ip}`;
    switch (true) {
      case data.statusCode.toString().startsWith('4'):
        this.logger.error(msg);
        break;

      default:
        this.logger.log(msg);
        break;
    }
  }
}
