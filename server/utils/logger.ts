import { createLogger, format, transports } from 'winston';

const loggerTransports = [];

const isProduction = process.env.NODE_ENV === 'production';

loggerTransports.push(
  new transports.Console({
    format: format.combine(format.colorize(), format.splat(), format.simple()),
    level: isProduction ? 'error' : 'info'
  })
);

const logger = createLogger({ transports: loggerTransports });

export default logger;
