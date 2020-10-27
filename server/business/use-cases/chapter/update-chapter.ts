import IChapterRepository, {
  UpdateChapterDto,
  Response,
  ChapterDto
} from '../../contracts/repositories/chapter-repository';

export interface IUpdateChapter {
  execute(id: string, params: UpdateChapterDto): Promise<Response<ChapterDto>>;
}

export class UpdateChapter implements IUpdateChapter {
  private readonly repository: IChapterRepository;

  constructor(repository: IChapterRepository) {
    this.repository = repository;
  }

  execute(id: string, params: UpdateChapterDto): Promise<Response<ChapterDto>> {
    return this.repository.update(id, params);
  }
}

export default UpdateChapter;
