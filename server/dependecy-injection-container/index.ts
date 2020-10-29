import { container } from 'tsyringe';
import mongoose from 'mongoose';

import IStoryRepository from '../business/contracts/repositories/story-repository';
import StoryRepository from '../infrastructure/odm/repositories/story-repository';

import IChapterRepository from '../business/contracts/repositories/chapter-repository';
import ChapterRepository from '../infrastructure/odm/repositories/chapter-repository';

import {
  IStoryMapper,
  StoryMapper,
  IChapterMapper,
  ChapterMapper
} from '../infrastructure/odm/mappers';

import {
  StoryDocument,
  StorySchema,
  StoryModelType
} from '../infrastructure/odm/models/story';

import {
  ChapterDocument,
  ChapterSchema,
  ChapterModelType
} from '../infrastructure/odm/models/chapter';

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

import {
  ICreateChapter,
  CreateChapter,
  IFindOneChapter,
  FindOneChapter,
  IFindChapters,
  FindChapters,
  IUpdateChapter,
  UpdateChapter,
  IDeleteChapter,
  DeleteChapter
} from '../business/use-cases/chapter';

import TYPES from './types';

export default function initContainer(): void {
  // MODELS
  container.register<StoryModelType>(TYPES.STORY_MODEL, {
    useValue: mongoose.model<StoryDocument>('Story', StorySchema)
  });
  container.register<ChapterModelType>(TYPES.CHAPTER_MODEL, {
    useValue: mongoose.model<ChapterDocument>('Chapter', ChapterSchema)
  });

  // MAPPERS
  container.register<IStoryMapper>(TYPES.STORY_MAPPER, {
    useFactory: (d) =>
      new StoryMapper(
        d.resolve<StoryModelType>(TYPES.STORY_MODEL),
        d.resolve<IChapterMapper>(TYPES.CHAPTER_MAPPER)
      )
  });
  container.register<IChapterMapper>(TYPES.CHAPTER_MAPPER, {
    useFactory: (d) =>
      new ChapterMapper(d.resolve<ChapterModelType>(TYPES.CHAPTER_MODEL))
  });

  // REPOSITORIES
  container.register<IStoryRepository>(TYPES.STORY_REPOSITORY, {
    useFactory: (d) =>
      new StoryRepository(
        d.resolve<StoryModelType>(TYPES.STORY_MODEL),
        d.resolve<IStoryMapper>(TYPES.STORY_MAPPER)
      )
  });
  container.register<IChapterRepository>(TYPES.CHAPTER_REPOSITORY, {
    useFactory: (d) =>
      new ChapterRepository(
        d.resolve<ChapterModelType>(TYPES.CHAPTER_MODEL),
        d.resolve<StoryModelType>(TYPES.STORY_MODEL),
        d.resolve<IChapterMapper>(TYPES.CHAPTER_MAPPER)
      )
  });

  // USE CASES - STORIES
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

  // USE CASES - CHAPTERS
  container.register<ICreateChapter>(TYPES.CREATE_CHAPTER, {
    useFactory: (d) =>
      new CreateChapter(d.resolve<IChapterRepository>(TYPES.CHAPTER_REPOSITORY))
  });
  container.register<IFindOneChapter>(TYPES.FIND_ONE_CHAPTER, {
    useFactory: (d) =>
      new FindOneChapter(
        d.resolve<IChapterRepository>(TYPES.CHAPTER_REPOSITORY)
      )
  });
  container.register<IFindChapters>(TYPES.FIND_CHAPTERS, {
    useFactory: (d) =>
      new FindChapters(d.resolve<IChapterRepository>(TYPES.CHAPTER_REPOSITORY))
  });
  container.register<IUpdateChapter>(TYPES.UPDATE_CHAPTER, {
    useFactory: (d) =>
      new UpdateChapter(d.resolve<IChapterRepository>(TYPES.CHAPTER_REPOSITORY))
  });
  container.register<IDeleteChapter>(TYPES.DELETE_CHAPTER, {
    useFactory: (d) =>
      new DeleteChapter(d.resolve<IChapterRepository>(TYPES.CHAPTER_REPOSITORY))
  });
}
