import { mongoose } from '../config/database';
import { AuthorModel } from '../models/models';

exports.handler = async (event, context, callback) => {
  const result = await AuthorModel.getAll();
  await mongoose.disconnect();
  return {
    body: JSON.stringify({ result }),
    statusCode: 200,
  };
};
