import {
  CreateStoryDto,
  UpdateStoryDto,
  StoryDto
} from '../../../business/use-cases/story/dtos';

import { StoryDocument, StoryModelType } from '../models/story';
export interface IStoryMapper {
  toDocument(dto: CreateStoryDto | UpdateStoryDto): StoryDocument;
  toDto(entity: StoryDocument): StoryDto;
}

export class StoryMapper implements IStoryMapper {
  private readonly model: StoryModelType;

  constructor(model: StoryModelType) {
    this.model = model;
  }

  toDocument(dto: CreateStoryDto | UpdateStoryDto): StoryDocument {
    return new this.model(dto);
  }

  toDto(entity: StoryDocument): StoryDto {
    return {
      id: entity.id,
      title: entity.title,
      summary: entity.summary,
      createdAt: entity.createdAt.toISOString()
    };
  }
}

export default StoryMapper;
