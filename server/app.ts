import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import cors, { CorsOptions } from 'cors';
import bodyParser from 'body-parser';
import { HttpError } from 'http-errors';
import logger from './utils/logger';
import expressLogger from './application/logger';
import ConnectionManager from './infrastructure/odm/connection-manager';
import containerDI from './dependecy-injection-container';

require('dotenv').config();

const app = express();
const port = process.env.API_PORT || 9000;
const environment = process.env.NODE_ENV;

app.use(expressLogger());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS configuration
const allowedList = ['http://localhost:3000', 'http:localhost:9000'];
const corsOptionsDelegate = (
  req: Request,
  callback: (err: Error | null, options?: CorsOptions) => void
) => {
  const corsOptions: { origin: boolean } = { origin: false };

  if (allowedList.indexOf(req.header('Origin') ?? '') !== -1) {
    corsOptions.origin = true;
  }

  callback(null, corsOptions);
};

// Error handling
const errorHandler = (
  err: HttpError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): void => {
  if (process.env.NODE_ENV === 'development') {
    logger.error(err.message);
    logger.error(err.stack || '');
  }

  res.status(err.status ?? 500);
  res.json(err);
};

app.use(cors(corsOptionsDelegate));
app.get('/v1/status', (req: Request, res: Response) => {
  res.json({ time: new Date() });
});

app.use(errorHandler);

ConnectionManager.connect()
  .then(() => {
    app.listen(port, () => {
      containerDI();
      logger.info(`Server listening on port %d, env: %s`, port, environment);
    });
  })
  .catch((err) => logger.info('Mongoose ODM connection error: ', err));
