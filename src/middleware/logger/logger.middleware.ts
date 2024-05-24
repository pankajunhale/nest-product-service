import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const logger = new Logger(this.use.name);
    const path = req.originalUrl ? req.originalUrl : req.url;
    logger.log(
      "info",
      `Logging HTTP request ${req.method} ${path}`,
      {
        context: `${LoggerMiddleware.name}::${this.use.name}`
      });
    const { ip, method } = req;
    res.on('close', () => {
      const { statusCode } = res.statusCode;
      const contentLength = res.get('content-length');
      logger.log("info", "", {
        context: `${LoggerMiddleware.name}::${this.use.name}`,
        method: method,
        path,
        statusCode: statusCode,
        ip: ip,
        content_length: contentLength,
        x_correlation_id: req.headers['x-correlation-id'],
      })
    });
    next();
  }
}
