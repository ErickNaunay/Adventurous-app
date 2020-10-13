import express, { Router } from 'express';
import storyRoutes from './story';

const router = express.Router();

export default function apiRouter(app: Router): Router {
  app.use('/api/v1/stories', storyRoutes);

  return router;
}
