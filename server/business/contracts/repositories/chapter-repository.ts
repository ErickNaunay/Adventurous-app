import {
  ChapterDto,
  CreateChapterDto,
  UpdateChapterDto
} from '../../use-cases/chapter/dtos';

import { Response } from '../../use-cases/common/dto';

export default interface IChapterRepository {
  find(): Promise<Response<ChapterDto[]>>;
  findOne(id: string): Promise<Response<ChapterDto>>;
  create(
    storyId: string,
    params: CreateChapterDto
  ): Promise<Response<ChapterDto>>;
  update(id: string, params: UpdateChapterDto): Promise<Response<ChapterDto>>;
  delete(id: string): Promise<void>;
}

export {
  ChapterDto,
  CreateChapterDto,
  UpdateChapterDto,
  Response,
  IChapterRepository
};
