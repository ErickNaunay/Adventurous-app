import ChapterDto from '../dtos/chapter-dto';

export default interface CreateChapterDto
  extends Omit<ChapterDto, 'id' | 'story' | 'createdAt'> {}
