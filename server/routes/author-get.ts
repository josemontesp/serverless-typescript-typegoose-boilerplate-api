import { APIGatewayProxyHandler } from 'aws-lambda';

import { AuthorModel } from '../models/models';
import { setupLambda } from './routes-helpers';

const handler: APIGatewayProxyHandler = async (event, context, callback) => {
  setupLambda(event, context, callback);

  const result = await AuthorModel.getAll();

  return {
    body: JSON.stringify({ result }),
    statusCode: 200,
  };
};

exports.handler = handler;
