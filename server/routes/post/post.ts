import { Request, Response, Router } from 'express';
import { AuthorModel } from '../../models/author-model';
import { Post } from '../../models/post-model';

export class PostRouter {
  public static routes(): Router {
    return Router()
      .get('/post', async (request: Request, response: Response) => {
        const posts = await Post.find({})
          .populate('author')
          .exec();

        response.json(posts);
      })
      .post('/post', async (request: Request, response: Response) => {
        const data = request.body;
        const author = await AuthorModel.findOne().exec();

        data.author = author._id;

        const post = await Post.create(data);

        response.json(post);
      });
  }
}
