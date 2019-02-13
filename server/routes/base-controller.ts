import { Indexable } from '../types';

export interface ApiRequest {
  body: Indexable<unknown>;
  queryStringParameters: Indexable<string>;
  pathParameters: Indexable<string>;
}

export interface BaseController {
  handle(request: ApiRequest): Promise<unknown>;
}
