import { RequestHandler } from 'express';
import morgan from 'morgan';
import logger from '../utils/logger';

const isProduction = process.env.NODE_ENV === 'production';

const expressFormat = isProduction ? 'combined' : 'dev';

const stream = {
  write(message: string): void {
    logger.info(message);
  }
};

const expressLogger = (): RequestHandler => morgan(expressFormat, { stream });

export default expressLogger;
