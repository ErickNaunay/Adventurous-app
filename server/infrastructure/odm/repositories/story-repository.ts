import createHttpError from 'http-errors';
import {
  StoryDto,
  CreateStoryDto,
  UpdateStoryDto,
  Response,
  IStoryRepository
} from '../../../business/contracts/repositories/story-repository';
import { IStoryMapper } from '../mappers';
import { StoryModelType } from '../models/story';

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
      ? stories.map((story) => this.mapper.toDto(story))
      : [];

    return {
      data: result
    };
  }

  async findOne(id: number): Promise<Response<StoryDto>> {
    const story = await this.model.findById(id).exec();

    if (!story) {
      throw new createHttpError.NotFound(
        `Could not find story with id = '${id}'`
      );
    }

    return {
      data: this.mapper.toDto(story)
    };
  }

  async create(params: CreateStoryDto): Promise<Response<StoryDto>> {
    const newStory = this.mapper.toDocument(params);

    const story = await newStory.save();

    return {
      data: this.mapper.toDto(story)
    };
  }

  async update(
    id: number,
    params: UpdateStoryDto
  ): Promise<Response<StoryDto>> {
    const story = await this.model.findById(id).exec();

    if (!story) {
      throw new createHttpError.NotFound(
        `Could not find story with id = '${id}'`
      );
    }

    const updateParams = this.mapper.toDocument(params);

    story.title = updateParams.title || story.title;
    story.summary = updateParams.summary || story.summary;

    const updateStory = await story.save();

    return {
      data: this.mapper.toDto(updateStory)
    };
  }

  async delete(id: number): Promise<void> {
    const story = await this.model.findByIdAndDelete(id).exec();

    if (!story) {
      throw new createHttpError.NotFound(
        `Could not find nor delete story with id = '${id}'`
      );
    }
  }
}
