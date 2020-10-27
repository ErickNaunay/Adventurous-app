import IChapterRepository, {
  ChapterDto,
  Response
} from '../../contracts/repositories/chapter-repository';

export interface IFindOneChapter {
  execute(id: string): Promise<Response<ChapterDto>>;
}

export class FindOneChapter implements IFindOneChapter {
  private readonly repository: IChapterRepository;

  constructor(repository: IChapterRepository) {
    this.repository = repository;
  }

  execute(id: string): Promise<Response<ChapterDto>> {
    return this.repository.findOne(id);
  }
}

export default FindOneChapter;
