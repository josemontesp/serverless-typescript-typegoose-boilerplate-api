import {
  INTERNAL_SERVER_ERROR,
  METHOD_NOT_ALLOWED,
  UNPROCESSABLE_ENTITY,
} from 'http-status-codes';

// tslint:disable:max-classes-per-file

export class HTTPError extends Error {
  public readonly statusCode: number = INTERNAL_SERVER_ERROR;
}

export class BodyParserError extends HTTPError {
  public readonly statusCode: number = UNPROCESSABLE_ENTITY;
}

export class MethodNotAllowedError extends HTTPError {
  public readonly statusCode: number = METHOD_NOT_ALLOWED;
}
