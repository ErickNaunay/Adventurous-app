import StoryDto from './story-dto';

export default interface CreateStoryDto
  extends Omit<StoryDto, 'id' | 'createdAt'> {}
