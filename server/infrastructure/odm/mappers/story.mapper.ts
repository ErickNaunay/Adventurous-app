import {
  CreateStoryDto,
  UpdateStoryDto,
  StoryDto
} from '../../../business/use-cases/story/dtos';

import { StoryDocument, StoryModelType } from '../models/story';
import { IChapterMapper } from './chapter.mapper';
export interface IStoryMapper {
  toDocument(dto: CreateStoryDto | UpdateStoryDto): StoryDocument;
  toDto(entity: StoryDocument): Promise<StoryDto>;
}

export class StoryMapper implements IStoryMapper {
  private readonly model: StoryModelType;
  private readonly chapterMapper: IChapterMapper;

  constructor(model: StoryModelType, chapterMapper: IChapterMapper) {
    this.model = model;
    this.chapterMapper = chapterMapper;
  }

  toDocument(dto: CreateStoryDto | UpdateStoryDto): StoryDocument {
    return new this.model(dto);
  }

  async toDto(entity: StoryDocument): Promise<StoryDto> {
    return {
      id: entity.id,
      title: entity.title,
      summary: entity.summary,
      chapters: entity.chapters?.length
        ? await Promise.all(
            entity.chapters.map((chapter) => this.chapterMapper.toDto(chapter))
          )
        : [],
      createdAt: entity.createdAt.toISOString()
    };
  }
}

export default StoryMapper;
