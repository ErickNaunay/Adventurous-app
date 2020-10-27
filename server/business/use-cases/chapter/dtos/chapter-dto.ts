import Chapter from '../../../entities/chapter';
import StoryDto from '../../../use-cases/story/dtos/story-dto';

export default interface ChapterDto
  extends Omit<Chapter, 'story' | 'createdAt'> {
  story?: StoryDto;
  createdAt: string;
}
