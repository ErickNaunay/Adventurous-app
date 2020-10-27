import IChaperRepository from '../../contracts/repositories/chapter-repository';

export interface IDeleteChapter {
  execute(id: string): Promise<void>;
}

export class DeleteChapter implements IDeleteChapter {
  private readonly repository: IChaperRepository;

  constructor(repository: IChaperRepository) {
    this.repository = repository;
  }

  execute(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}

export default DeleteChapter;
