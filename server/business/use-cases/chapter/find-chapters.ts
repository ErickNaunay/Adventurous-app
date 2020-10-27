import IChapterRepository, {
  ChapterDto,
  Response
} from '../../contracts/repositories/chapter-repository';

export interface IFindChapters {
  execute(): Promise<Response<ChapterDto[]>>;
}

export class FindChapters implements IFindChapters {
  private readonly repository: IChapterRepository;

  constructor(repository: IChapterRepository) {
    this.repository = repository;
  }

  execute(): Promise<Response<ChapterDto[]>> {
    return this.repository.find();
  }
}

export default FindChapters;
