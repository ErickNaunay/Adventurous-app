import {
  StoryDto,
  CreateStoryDto,
  UpdateStoryDto
} from '../../use-cases/story/dtos';
import { Response } from '../../use-cases/common/dto';

export default interface IStoryRepository {
  find(): Promise<Response<StoryDto[]>>;
  findOne(id: string): Promise<Response<StoryDto>>;
  create(params: CreateStoryDto): Promise<Response<StoryDto>>;
  update(id: string, params: UpdateStoryDto): Promise<Response<StoryDto>>;
  delete(id: string): Promise<void>;
}

export { StoryDto, CreateStoryDto, UpdateStoryDto, Response, IStoryRepository };
