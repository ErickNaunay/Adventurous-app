import Story from '../../../entities/story';
import ChapterDto from '../../chapter/dtos/chapter-dto';

export default interface StoryDto
  extends Omit<Story, 'chapters' | 'createdAt'> {
  chapters?: ChapterDto[];
  createdAt: string;
}
