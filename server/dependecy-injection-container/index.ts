import { container } from 'tsyringe';
import mongoose from 'mongoose';

import IStoryRepository from '../business/contracts/repositories/story-repository';
import StoryRepository from '../infrastructure/odm/repositories/story-repository';

import { IStoryMapper, StoryMapper } from '../infrastructure/odm/mappers';

import {
  StoryDocument,
  StorySchema,
  StoryModelType
} from '../infrastructure/odm/models/story';

import {
  ICreateStory,
  CreateStory,
  IFindOneStory,
  FindOneStory,
  IFindStories,
  FindStories,
  IUpdateStory,
  UpdateStory,
  IDeleteStory,
  DeleteStory
} from '../business/use-cases/story';

import TYPES from './types';

export default function initContainer(): void {
  // MODELS
  container.register<StoryModelType>(TYPES.STORY_MODEL, {
    useValue: mongoose.model<StoryDocument>('Story', StorySchema)
  });

  // MAPPERS
  container.register<IStoryMapper>(TYPES.STORY_MAPPER, {
    useFactory: (d) =>
      new StoryMapper(d.resolve<StoryModelType>(TYPES.STORY_MODEL))
  });

  // REPOSITORIES
  container.register<IStoryRepository>(TYPES.STORY_REPOSITORY, {
    useFactory: (d) =>
      new StoryRepository(
        d.resolve<StoryModelType>(TYPES.STORY_MODEL),
        d.resolve<IStoryMapper>(TYPES.STORY_MAPPER)
      )
  });

  // USE CASES
  container.register<ICreateStory>(TYPES.CREATE_STORY, {
    useFactory: (d) =>
      new CreateStory(d.resolve<IStoryRepository>(TYPES.STORY_REPOSITORY))
  });
  container.register<IFindOneStory>(TYPES.FIND_ONE_STORY, {
    useFactory: (d) =>
      new FindOneStory(d.resolve<IStoryRepository>(TYPES.STORY_REPOSITORY))
  });
  container.register<IFindStories>(TYPES.FIND_STORIES, {
    useFactory: (d) =>
      new FindStories(d.resolve<IStoryRepository>(TYPES.STORY_REPOSITORY))
  });
  container.register<IUpdateStory>(TYPES.UPDATE_STORY, {
    useFactory: (d) =>
      new UpdateStory(d.resolve<IStoryRepository>(TYPES.STORY_REPOSITORY))
  });
  container.register<IDeleteStory>(TYPES.DELETE_STORY, {
    useFactory: (d) =>
      new DeleteStory(d.resolve<IStoryRepository>(TYPES.STORY_REPOSITORY))
  });
}
