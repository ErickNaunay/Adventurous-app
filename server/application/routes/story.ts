import express, { Router } from 'express';
import asyncHandler from 'express-async-handler';

import {
  findOne,
  find,
  create,
  update,
  remove
} from '../controllers/story-controller';

const router = express.Router();

export default function storyRoutes(): Router {
  router.route('/').get(asyncHandler(find)).post(asyncHandler(create));
  router
    .route('/:id')
    .get(asyncHandler(findOne))
    .put(asyncHandler(update))
    .delete(asyncHandler(remove));

  return router;
}
