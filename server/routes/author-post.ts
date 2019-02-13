import { AuthorModel } from '../models/models';
import { awsLambdaHelper } from './aws-lambda-helper';
import { ApiRequest, BaseController } from './base-controller';

export class AuthorPostController implements BaseController {
  public handle(request: ApiRequest) {
    return new AuthorModel(request.body).save();
  }
}

exports.handler = awsLambdaHelper.getHandler(new AuthorPostController());
