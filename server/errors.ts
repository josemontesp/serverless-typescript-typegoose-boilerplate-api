import {
  INTERNAL_SERVER_ERROR,
  METHOD_NOT_ALLOWED,
  UNPROCESSABLE_ENTITY,
} from 'http-status-codes';

// tslint:disable:max-classes-per-file

export class GenericError extends Error {
  public readonly statusCode: number = INTERNAL_SERVER_ERROR;
  public readonly message: string = `There was an error. That's all we know.`;
}

export class BodyParserError extends GenericError {
  public readonly statusCode: number = UNPROCESSABLE_ENTITY;
  public readonly message: string = 'The provided body is not a valid JSON.';
}

export class MethodNotAllowedError extends GenericError {
  public readonly statusCode: number = METHOD_NOT_ALLOWED;
  public readonly message: string = 'The HTTP method is not allowed.';
}
