import * as chai from 'chai';

import { Author, AuthorModel } from '../../models/models';

process.env.NODE_ENV = 'testing';

const expect = chai.expect;

describe('Models Author', () => {
  let authorObject: Author;

  it('should insert new author', async () => {
    const author = new AuthorModel();
    author.name = 'John';
    author.age = 30;
    author.description = 'He is writer';

    const res = await author.save();
    console.log(res);
    authorObject = res;

    expect(res).to.be.an('object');
    expect(res.name).to.be.equal('John');
  });

  it('should update user', async () => {
    const results: { nModified: number } = await AuthorModel.updateAuthor(
      authorObject._id,
      'He is not writer',
    );

    expect(+results.nModified).to.be.equal(1);
  });

  it('should update by age', async () => {
    const { nModified } = await AuthorModel.updateByAge(21, 'Good one :)');
    const author: Author = (await AuthorModel.findById(authorObject._id)
      .lean()
      .exec()) as Author;

    expect(author.description).to.be.equal('Good one :)');
    expect(nModified).to.be.equal(1);
  });
});
