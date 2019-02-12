import { AuthorModel } from '../models/models';
import { getAWSLambdaHandler } from './routes-helpers';

export const controller = (bodyParams: object) => {
  return new AuthorModel(bodyParams).save();
};

exports.handler = getAWSLambdaHandler(controller);
