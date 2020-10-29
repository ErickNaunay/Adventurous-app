import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import logger from './utils/logger';

const app = express();

const port = process.env.APP_PORT || 7000;
const environment = process.env.NODE_ENV;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'pug');

app.get('/v1/status', (req: Request, res: Response) => {
  res.json({ time: new Date() });
});

app.listen(port, () => {
  logger.info(`Server listening on port %d, env: %s`, port, environment);
});
