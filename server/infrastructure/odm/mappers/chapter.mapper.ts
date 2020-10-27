import {
  ChapterDto,
  CreateChapterDto,
  UpdateChapterDto
} from '../../../business/use-cases/chapter/dtos';

import { ChapterDocument, ChapterModelType } from '../models/chapter';

export interface IChapterMapper {
  toDocument(dto: CreateChapterDto | UpdateChapterDto): ChapterDocument;
  toDto(entity: ChapterDocument): ChapterDto;
}

export class ChapterMapper implements IChapterMapper {
  private readonly model: ChapterModelType;

  constructor(model: ChapterModelType) {
    this.model = model;
  }

  toDocument(dto: CreateChapterDto | UpdateChapterDto): ChapterDocument {
    return new this.model(dto);
  }

  toDto(entity: ChapterDocument): ChapterDto {
    return {
      id: entity.id,
      story: entity.story && {
        id: entity.story.id,
        title: entity.story.title,
        summary: entity.story.summary,
        createdAt: entity.createdAt.toISOString()
      },
      sequence: entity.sequence,
      content: entity.content,
      connections: entity.connections,
      createdAt: entity.createdAt.toISOString()
    };
  }
}

export default ChapterMapper;
