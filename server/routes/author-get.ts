import { AuthorModel } from '../models/models';
import { awsLambdaHelper } from './aws-lambda-helper';
import { ApiRequest, BaseController } from './base-controller';

export class AuthorGetController implements BaseController {
  public handle(request: ApiRequest) {
    return AuthorModel.getAll();
  }
}

exports.handler = awsLambdaHelper.getHandler(new AuthorGetController());
