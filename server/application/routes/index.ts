import express, { Router } from 'express';
import storyRoutes from './story';
import chapterRoutes from './chapter';

const router = express.Router();

export default function apiRouter(app: Router): Router {
  app.use('/api/v1/stories', storyRoutes());
  app.use('/api/v1/chapters', chapterRoutes());
  return router;
}
