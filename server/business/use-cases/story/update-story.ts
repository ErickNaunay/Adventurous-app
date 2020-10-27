import IStoryRepository, {
  UpdateStoryDto,
  Response,
  StoryDto
} from '../../contracts/repositories/story-repository';

export interface IUpdateStory {
  execute(id: string, params: UpdateStoryDto): Promise<Response<StoryDto>>;
}

export class UpdateStory implements IUpdateStory {
  private readonly repository: IStoryRepository;

  constructor(repository: IStoryRepository) {
    this.repository = repository;
  }

  execute(id: string, params: UpdateStoryDto): Promise<Response<StoryDto>> {
    return this.repository.update(id, params);
  }
}

export default UpdateStory;
