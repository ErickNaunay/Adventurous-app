import IStoryRepository, {
  StoryDto,
  Response
} from '../../contracts/repositories/story-repository';

export interface IFindStories {
  execute(): Promise<Response<StoryDto[]>>;
}

export class FindStories implements IFindStories {
  private readonly repository: IStoryRepository;

  constructor(repository: IStoryRepository) {
    this.repository = repository;
  }

  execute(): Promise<Response<StoryDto[]>> {
    return this.repository.find();
  }
}

export default FindStories;
