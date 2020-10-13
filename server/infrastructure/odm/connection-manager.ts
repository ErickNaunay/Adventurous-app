import mongoose from 'mongoose';
import logger from '../../utils/logger';

export default class ConnectionManager {
  static async connect(): Promise<void> {
    await mongoose
      .connect(process.env.DB_HOST!, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then(() => {
        logger.info('Mongoose db connection done!');
      })
      .catch((err) => {
        logger.error('Mongoose db connection error...\n' + err);
      });
  }
}
