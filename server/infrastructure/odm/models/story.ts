import mongoose, { Document, Schema, Model } from 'mongoose';
import IStory from '../../../business/entities/story';
import { ChapterDocument } from './chapter';

export interface StoryDocument
  extends Omit<IStory, 'id' | 'chapters'>,
    Document {
  chapters: ChapterDocument[];
}

export const StorySchema: Schema = new Schema({
  title: { type: String, unique: true, required: true },
  summary: { type: String, required: true },
  chapters: [{ type: Schema.Types.ObjectId, ref: 'Chapter' }],
  createdAt: { type: Date, default: Date.now }
});

export type StoryModelType = Model<StoryDocument>;

export default mongoose.model<StoryDocument>('Story', StorySchema);
