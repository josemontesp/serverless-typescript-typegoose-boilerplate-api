import { Types } from 'mongoose';
import { GetModelForClassOptions, pre, prop, Typegoose } from 'typegoose';

import { mongoose } from '../config/database';

@pre<BaseModel>('save', async function(next) {
  if (this._id === undefined || this._id === null) {
    this._id = Types.ObjectId();
  }
  next();
})
export class BaseModel extends Typegoose {
  // tslint:disable-next-line:variable-name
  @prop() public _id?: Types.ObjectId;

  public getModelForClass<T>(t: T, options?: GetModelForClassOptions) {
    return super.getModelForClass(t, {
      existingMongoose: mongoose,
      ...options,
    });
  }
}
