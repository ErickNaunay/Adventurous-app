import IStoryRepository, {
  StoryDto,
  Response
} from '../../contracts/repositories/story-repository';

export interface IFindOneStory {
  execute(id: number): Promise<Response<StoryDto>>;
}

export class FindOneStory implements IFindOneStory {
  private readonly repository: IStoryRepository;

  constructor(repository: IStoryRepository) {
    this.repository = repository;
  }

  execute(id: number): Promise<Response<StoryDto>> {
    return this.repository.findOne(id);
  }
}

export default FindOneStory;
