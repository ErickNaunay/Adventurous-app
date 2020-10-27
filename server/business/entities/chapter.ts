import Story from './story';

export default interface Chapter {
  id: string;
  story?: Story;
  sequence: number;
  content: string;
  connections: number[];
  createdAt: Date;
}
