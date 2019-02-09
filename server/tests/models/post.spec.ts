import * as chai from 'chai';

import { Author, AuthorModel, Post } from '../../models/models';

process.env.NODE_ENV = 'testing';

const expect = chai.expect;

describe('Posts', () => {
  it('should insert new post', (done) => {
    const author = new AuthorModel();
    author.name = 'John';
    author.description = 'He is writer';

    author.save(async (err: Error, res: Author) => {
      expect(res).to.be.an('object');
      expect(res.name).to.be.equal('John');

      await Post.create(
        {
          author: res._id,
          description: 'Lorem ipsum...',
          title: 'Tile 1',
        },
        {
          author: res._id,
          description: 'Lorem ipsum...',
          title: 'Tile 2',
        },
      );

      const posts = await Post.findAllByAuthor(res._id.toString());

      expect(posts).to.be.length(2);
      done();
    });
  });
});
