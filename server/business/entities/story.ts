import Chapter from './chapter';
export default interface Story {
  id: string;
  title: string;
  summary: string;
  chapters?: Chapter[];
  createdAt: Date;
}
