import {
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
  Context,
} from 'aws-lambda';

import { BodyParserError, HTTPError } from '../errors';
import { Indexable } from '../types';
import { BaseController } from './base-controller';

class AWSLambdaHelper {
  /**
   * Receives a controller and returns a handler function usable as an AWS
   * lambda function.
   */
  public getHandler(controller: BaseController): APIGatewayProxyHandler {
    return async (event, context, callback) => {
      try {
        this.setupLambda(event, context, callback);

        const body = this.parseBody(event.body);
        const queryStringParameters = event.queryStringParameters;
        const pathParameters = event.pathParameters;

        const result = await controller.handle({
          body,
          pathParameters,
          queryStringParameters,
        });

        return {
          body: JSON.stringify(result),
          statusCode: 200,
        };
      } catch (error) {
        return this.getErrorResponse(error);
      }
    };
  }

  /** Initial setup to process the request */
  private setupLambda(event, context: Context, callback) {
    context.callbackWaitsForEmptyEventLoop = false;
  }

  /**
   * Parses the body of the request and throws BodyParserError if not successful.
   */
  private parseBody(body): Indexable<unknown> {
    try {
      return JSON.parse(body);
    } catch (error) {
      throw new BodyParserError(error);
    }
  }

  /** Constructs an error response based on the provided error object. */
  private getErrorResponse(
    error: HTTPError,
    status = 500,
  ): APIGatewayProxyResult {
    const statusCode = error.statusCode || status;
    return {
      body: JSON.stringify({ statusCode, message: error.message }),
      statusCode,
    };
  }
}

export const awsLambdaHelper = new AWSLambdaHelper();
