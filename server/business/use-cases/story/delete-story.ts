import IStoryRepository from '../../contracts/repositories/story-repository';

export interface IDeleteStory {
  execute(id: number): Promise<void>;
}

export class DeleteStory implements IDeleteStory {
  private readonly repository: IStoryRepository;

  constructor(repository: IStoryRepository) {
    this.repository = repository;
  }

  execute(id: number): Promise<void> {
    return this.repository.delete(id);
  }
}

export default DeleteStory;
