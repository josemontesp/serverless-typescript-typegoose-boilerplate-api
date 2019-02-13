import { awsLambdaHelper } from '../aws-lambda-service';
import { AuthorModel } from '../models/models';
import { ApiRequest, BaseController } from './base-controller';

export class AuthorController extends BaseController {
  public get() {
    return AuthorModel.getAll();
  }

  public post(request: ApiRequest) {
    return new AuthorModel(request.body).save();
  }
}

exports.handler = awsLambdaHelper.getHandler(new AuthorController());
