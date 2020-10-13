import mongoose, { Document, Schema, Model } from 'mongoose';
import IStory from '../../../business/entities/story';
export interface StoryDocument extends Omit<IStory, 'id'>, Document {}

export const StorySchema: Schema = new Schema({
  title: { type: String, unique: true, required: true },
  summary: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export type StoryModelType = Model<StoryDocument>;

export default mongoose.model<StoryDocument>('Story', StorySchema);
