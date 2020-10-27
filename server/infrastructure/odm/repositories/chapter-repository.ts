import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';
import {
  ChapterDto,
  CreateChapterDto,
  UpdateChapterDto,
  Response,
  IChapterRepository
} from '../../../business/contracts/repositories/chapter-repository';
import { IChapterMapper } from '../mappers';
import { ChapterDocument, ChapterModelType } from '../models/chapter';
import { StoryModelType } from '../models/story';

export default class ChapterRepository implements IChapterRepository {
  private readonly model: ChapterModelType;
  private readonly storyModel: StoryModelType;
  private readonly mapper: IChapterMapper;

  constructor(
    model: ChapterModelType,
    storyModel: StoryModelType,
    mapper: IChapterMapper
  ) {
    this.model = model;
    this.storyModel = storyModel;
    this.mapper = mapper;
  }

  async find(): Promise<Response<ChapterDto[]>> {
    const chapters = await this.model.find().exec();

    const result = chapters?.length
      ? chapters.map((chapter) => this.mapper.toDto(chapter))
      : [];

    return {
      data: result
    };
  }

  async findOne(id: string): Promise<Response<ChapterDto>> {
    const errorMsg = `Could not find chapter with id = '${id}'`;

    if (!isValidObjectId(id)) {
      throw new createHttpError.NotFound(errorMsg);
    }

    const chapter = await this.model.findById(id).exec();

    if (!chapter) {
      throw new createHttpError.NotFound(errorMsg);
    }

    return {
      data: this.mapper.toDto(chapter)
    };
  }

  async create(
    storyId: string,
    params: CreateChapterDto
  ): Promise<Response<ChapterDto>> {
    const errorMsg = `Could not find story with id = '${storyId}'`;

    if (!isValidObjectId(storyId)) {
      throw new createHttpError.NotFound(errorMsg);
    }

    const story = await this.storyModel.findById(storyId).exec();

    if (!story) {
      throw new createHttpError.NotFound(errorMsg);
    }

    const newChapter = this.mapper.toDocument(params);
    newChapter.story = story;

    let chapter: ChapterDocument;

    try {
      chapter = await newChapter.save();
      story.chapters.push(newChapter.id);
      await story.save();
    } catch (err) {
      throw new createHttpError.BadRequest(
        'Chapter could not be created due to bad request parameters'
      );
    }

    return {
      data: this.mapper.toDto(chapter)
    };
  }

  async update(
    id: string,
    params: UpdateChapterDto
  ): Promise<Response<ChapterDto>> {
    const errorMsg = `Could not chapter story with id = '${id}'`;

    if (!isValidObjectId(id)) {
      throw new createHttpError.NotFound(errorMsg);
    }

    const chapter = await this.model.findById(id).exec();

    if (!chapter) {
      throw new createHttpError.NotFound(errorMsg);
    }

    const updateParams = this.mapper.toDocument(params);

    chapter.content = updateParams.content || chapter.content;
    chapter.connections = updateParams.connections || chapter.connections;

    let updateChapter: ChapterDocument;
    try {
      updateChapter = await chapter.save();
    } catch (err) {
      throw new createHttpError.BadRequest(
        'Chapter could not be created due to bad request parameters'
      );
    }

    return {
      data: this.mapper.toDto(updateChapter)
    };
  }

  async delete(id: string): Promise<void> {
    const errorMsg = `Could not find nor delete chapter with id = '${id}'`;

    if (!isValidObjectId(id)) {
      throw new createHttpError.NotFound(errorMsg);
    }

    const chapter = await this.model.findByIdAndDelete(id).exec();

    if (!chapter) {
      throw new createHttpError.NotFound(errorMsg);
    }
  }
}
