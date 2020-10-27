import IChapterRepository, {
  CreateChapterDto,
  Response,
  ChapterDto
} from '../../contracts/repositories/chapter-repository';

export interface ICreateChapter {
  execute(id: string, params: CreateChapterDto): Promise<Response<ChapterDto>>;
}

export class CreateChapter implements ICreateChapter {
  private readonly repository: IChapterRepository;

  constructor(repository: IChapterRepository) {
    this.repository = repository;
  }

  execute(id: string, params: CreateChapterDto): Promise<Response<ChapterDto>> {
    return this.repository.create(id, params);
  }
}

export default CreateChapter;
