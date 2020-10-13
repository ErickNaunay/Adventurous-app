import Story from '../../../entities/story';

export default interface StoryDto extends Omit<Story, 'createdAt'> {
  createdAt: string;
}
