import IStoryRepository, {
  CreateStoryDto,
  Response,
  StoryDto
} from '../../contracts/repositories/story-repository';

export interface ICreateStory {
  execute(params: CreateStoryDto): Promise<Response<StoryDto>>;
}

export class CreateStory implements ICreateStory {
  private readonly repository: IStoryRepository;

  constructor(repository: IStoryRepository) {
    this.repository = repository;
  }

  execute(params: CreateStoryDto): Promise<Response<StoryDto>> {
    return this.repository.create(params);
  }
}

export default CreateStory;
