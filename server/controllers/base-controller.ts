import { MethodNotAllowedError } from '../errors';
import { HTTPMethod, Indexable } from '../types';

export interface ApiRequest {
  body: Indexable<unknown>;
  queryStringParameters: Indexable<string>;
  pathParameters: Indexable<string>;
}

export abstract class BaseController {
  public get(request: ApiRequest): Promise<unknown> {
    throw new MethodNotAllowedError();
  }

  public post(request: ApiRequest): Promise<unknown> {
    throw new MethodNotAllowedError();
  }

  public put(request: ApiRequest): Promise<unknown> {
    throw new MethodNotAllowedError();
  }

  public delete(request: ApiRequest): Promise<unknown> {
    throw new MethodNotAllowedError();
  }

  public executeHTTPMethod(method: HTTPMethod, apiRequest: ApiRequest) {
    switch (method) {
      case HTTPMethod.GET:
        return this.get(apiRequest);
      case HTTPMethod.POST:
        return this.post(apiRequest);
      case HTTPMethod.PUT:
        return this.put(apiRequest);
      case HTTPMethod.DELETE:
        return this.delete(apiRequest);
      default:
        throw new MethodNotAllowedError();
    }
  }
}
