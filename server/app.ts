import { json, urlencoded } from 'body-parser';
import * as express from 'express';
import * as path from 'path';

import { AuthorRouter } from './routes/author/author';
import { APIDocsRouter } from './routes/swagger';

const app = express();

app.use(json());
app.use(
  urlencoded({
    extended: true,
  }),
);

app.get('/', (request: express.Request, response: express.Response) => {
  response.json({
    name: 'Express application',
  });
});

app.use(
  (
    err: Error & { status: number },
    request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) => {
    response.status(err.status || 500);
    response.json({
      error: 'Server error',
    });
  },
);

app.use('/api', new AuthorRouter().getRouter());
app.use('/api/swagger', new APIDocsRouter().getRouter());
app.use('/docs', express.static(path.join(__dirname, './assets/swagger')));

const server = app.listen(process.env.PORT || 3000, () =>
  console.log('api started!'),
);

export { server };
