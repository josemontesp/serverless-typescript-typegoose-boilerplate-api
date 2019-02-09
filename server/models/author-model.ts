import { ModelType, prop, staticMethod } from 'typegoose';

import { BaseModel } from './base-model';

export class Author extends BaseModel {
  @staticMethod
  public static updateByAge(
    this: ModelType<Author> & typeof Author,
    ageLimit: number,
    text: string,
  ) {
    return (this.where('age')
      .gte(ageLimit)
      .update({
        $set: {
          description: text,
        },
      }) as unknown) as { nModified: number };
  }

  @staticMethod
  public static updateAuthor(
    this: ModelType<Author> & typeof Author,
    author: {},
    description: string,
  ) {
    return this.update(
      {
        _id: author,
      },
      {
        $set: {
          description,
        },
      },
    ).exec();
  }

  @prop() public age?: number;
  @prop() public description?: string;
  @prop({ required: true }) public name: string;
}

export const AuthorModel = new Author().getModelForClass(Author);
