import { Context } from 'aws-lambda';

import { BodyParserError, HTTPError } from '../errors';

/** Initial setup for the AWS lambda function. */
export const setupLambda = (event, context: Context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
};

/**
 * Parses the body of the request and throws BodyParserError if not successful.
 */
export const parseBody = (body) => {
  try {
    return JSON.parse(body);
  } catch (error) {
    throw new BodyParserError(error);
  }
};

/** Constructs an error response based on the provided error object. */
export const getErrorResponse = (error: HTTPError, status = 500) => {
  const statusCode = error.statusCode || status;
  return {
    body: JSON.stringify({ statusCode, message: error.message }),
    statusCode,
  };
};

/**
 * Receives a controller function and returns a handler function usable as an
 * AWS lambda function. Useful because it abstracts all the setup logic and
 * error handling.
 */
export const getAWSLambdaHandler = (controller: (body: object) => object) => {
  return async (event, context, callback) => {
    try {
      setupLambda(event, context, callback);

      const bodyParams = parseBody(event.body);

      const result = await controller(bodyParams);

      return {
        body: JSON.stringify(result),
        statusCode: 200,
      };
    } catch (error) {
      return getErrorResponse(error);
    }
  };
};
