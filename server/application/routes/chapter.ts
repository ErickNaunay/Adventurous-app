import express, { Router } from 'express';
import asyncHandler from 'express-async-handler';

import {
  findOne,
  find,
  create,
  update,
  remove
} from '../controllers/chapter-controller';

const router = express.Router();

export default function chapterRoutes(): Router {
  router.route('/').get(asyncHandler(find));
  router.route('/stories/:id').post(asyncHandler(create));
  router
    .route('/:id')
    .get(asyncHandler(findOne))
    .put(asyncHandler(update))
    .delete(asyncHandler(remove));

  return router;
}
