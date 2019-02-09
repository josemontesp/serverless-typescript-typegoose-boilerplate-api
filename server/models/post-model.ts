// import * as mongoose from "mongoose";
import { Document, Model, Schema } from 'mongoose';
import { mongoose } from '../config/database';

export interface IPost extends Document {
  title: string;
  create: Date;
  author: {};
  description: string;
}

export interface IPostModel extends Model<IPost> {
  findAllByAuthor(id: string): Promise<IPost[]>;
}

const schema = new Schema({
  author: {
    ref: 'Author',
    type: Schema.Types.ObjectId,
  },
  create: {
    default: Date.now,
    type: Date,
  },
  description: String,
  title: String,
});

schema.static('findAllByAuthor', (author: string) => {
  return Post.find({ author })
    .lean()
    .exec();
});

export const Post = mongoose.model<IPost>('Post', schema) as IPostModel;
