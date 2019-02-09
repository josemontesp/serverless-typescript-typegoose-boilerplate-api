import { Request, Response, Router } from 'express';
import { AuthorModel } from '../../models/author-model';

export class AuthorRouter {
  private router: Router = Router();

  public getRouter(): Router {
    /**
     * @swagger
     * /api/author:
     *   get:
     *     tags:
     *      - Author
     *     description:
     *      List of all authors registered in system.
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Authors
     *       400:
     *         description: Invalid request
     *       403:
     *         description: Forbidden
     */
    this.router.get('/author', async (request: Request, response: Response) => {
      const authors = await AuthorModel.find({}).exec();

      response.json(authors);
    });

    /**
     * @swagger
     * /api/author:
     *   post:
     *     tags:
     *      - Author
     *     description:
     *      Create new author.
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Author
     *       400:
     *         description: Invalid request
     *       403:
     *         description: Forbidden
     */
    this.router.post(
      '/author',
      async (request: Request, response: Response) => {
        const author = await AuthorModel.create(request.body);

        response.status(200).json(author);
      },
    );

    return this.router;
  }
}
