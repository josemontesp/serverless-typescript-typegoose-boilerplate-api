import {
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
  Context,
} from 'aws-lambda';
import { INTERNAL_SERVER_ERROR } from 'http-status-codes';

import { BaseController } from './controllers/base-controller';
import { BodyParserError, GenericError } from './errors';
import { HTTPMethod, Indexable } from './types';

class AWSLambdaService {
  /**
   * Receives a controller and returns a handler function usable as an AWS
   * lambda function.
   */
  public getHandler(controller: BaseController): APIGatewayProxyHandler {
    return async (event, context, callback) => {
      try {
        this.setupLambda(event, context, callback);

        const apiRequest = {
          body: this.parseBody(event.body),
          pathParameters: event.queryStringParameters,
          queryStringParameters: event.pathParameters,
        };

        const result = await controller.executeHTTPMethod(
          event.httpMethod as HTTPMethod,
          apiRequest,
        );

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
    error: GenericError,
    status = INTERNAL_SERVER_ERROR,
  ): APIGatewayProxyResult {
    const statusCode = error.statusCode || status;
    return {
      body: JSON.stringify({ statusCode, message: error.message }),
      statusCode,
    };
  }
}

// This is a singleton
export const awsLambdaHelper = new AWSLambdaService();
