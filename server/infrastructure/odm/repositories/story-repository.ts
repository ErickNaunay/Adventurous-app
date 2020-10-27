import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';
import httpStatusCodes from 'http-status-codes';
import {
  StoryDto,
  CreateStoryDto,
  UpdateStoryDto,
  Response,
  IStoryRepository
} from '../../../business/contracts/repositories/story-repository';
import { IStoryMapper } from '../mappers';
import { StoryDocument, StoryModelType } from '../models/story';

export default class StoryRepository implements IStoryRepository {
  private readonly model: StoryModelType;
  private readonly mapper: IStoryMapper;

  constructor(model: StoryModelType, mapper: IStoryMapper) {
    this.model = model;
    this.mapper = mapper;
  }

  async find(): Promise<Response<StoryDto[]>> {
    const stories = await this.model.find().exec();

    const result = stories?.length
      ? await Promise.all(
          stories.map(async (story) => await this.mapper.toDto(story))
        )
      : [];

    return {
      data: result
    };
  }

  async findOne(id: string): Promise<Response<StoryDto>> {
    const errorMsg = `Could not find story with id = '${id}'`;

    if (!isValidObjectId(id)) {
      throw new createHttpError.NotFound(errorMsg);
    }

    const story = await this.model.findById(id).exec();

    if (!story) {
      throw new createHttpError.NotFound(errorMsg);
    }

    return {
      data: await this.mapper.toDto(story)
    };
  }

  async create(params: CreateStoryDto): Promise<Response<StoryDto>> {
    const newStory = this.mapper.toDocument(params);

    let story: StoryDocument;

    try {
      story = await newStory.save();
    } catch (err) {
      throw createHttpError(
        httpStatusCodes.BAD_REQUEST,
        'Story could not be created',
        {
          errors: [
            {
              property: 'title',
              constraints: ['has already been taken']
            }
          ]
        }
      );
    }

    return {
      data: await this.mapper.toDto(story)
    };
  }

  async update(
    id: string,
    params: UpdateStoryDto
  ): Promise<Response<StoryDto>> {
    const errorMsg = `Could not find story with id = '${id}'`;

    if (!isValidObjectId(id)) {
      throw new createHttpError.NotFound(errorMsg);
    }

    const story = await this.model.findById(id).exec();

    if (!story) {
      throw new createHttpError.NotFound(errorMsg);
    }

    const updateParams = this.mapper.toDocument(params);

    story.title = updateParams.title || story.title;
    story.summary = updateParams.summary || story.summary;

    let updateStory: StoryDocument;
    try {
      updateStory = await story.save();
    } catch (err) {
      throw createHttpError(
        httpStatusCodes.BAD_REQUEST,
        'Story could not be created',
        {
          errors: [
            {
              property: 'title',
              constraints: ['has already been taken']
            }
          ]
        }
      );
    }

    return {
      data: await this.mapper.toDto(updateStory)
    };
  }

  async delete(id: string): Promise<void> {
    const errorMsg = `Could not find nor delete story with id = '${id}'`;

    if (!isValidObjectId(id)) {
      throw new createHttpError.NotFound(errorMsg);
    }

    const story = await this.model.findByIdAndDelete(id).exec();

    if (!story) {
      throw new createHttpError.NotFound(errorMsg);
    }
  }
}
