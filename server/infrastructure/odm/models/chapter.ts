import moongoose, { Document, Schema, Model } from 'mongoose';
import IChapter from '../../../business/entities/chapter';
import { StoryDocument } from './story';

export interface ChapterDocument
  extends Omit<IChapter, 'id' | 'story'>,
    Document {
  story: StoryDocument;
}

export const ChapterSchema: Schema = new Schema({
  story: { type: Schema.Types.ObjectId, ref: 'Story' },
  sequence: { type: Number, default: 0, required: true },
  content: { type: String, required: true },
  connections: [Number],
  createdAt: { type: Date, default: Date.now }
});

export type ChapterModelType = Model<ChapterDocument>;

export default moongoose.model<ChapterDocument>('Chapter', ChapterSchema);
