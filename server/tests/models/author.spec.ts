import * as chai from 'chai';

import { Author, AuthorModel } from '../../models/models';

process.env.NODE_ENV = 'testing';

const expect = chai.expect;

describe('Models Author', () => {
  let authorObject: Author;

  beforeEach(async () => {
    await AuthorModel.deleteMany({});
  });

  afterEach(async () => {
    await AuthorModel.deleteMany({});
  });

  describe('GET', () => {
    it('should get all the authors', async () => {
      const author1 = new AuthorModel().save();
      const author2 = new AuthorModel().save();
      const author3 = new AuthorModel().save();

      const authors = await AuthorModel.getAll();

      expect(authors.length).to.be.equal(3);
    });
  });

  describe('GET one', () => {
    beforeEach(async () => {
      authorObject = await new AuthorModel().save();
    });

    it('should get an author by id', async () => {
      const author = await AuthorModel.getOne(authorObject._id);

      expect(author.id).to.be.equal(authorObject._id.toHexString());
    });
  });

  describe('POST', () => {
    it('should create a new Author', async () => {
      const author = new AuthorModel();
      author.name = 'John';
      author.age = 30;
      author.description = 'He is writer';

      const res = await author.save();

      expect(res).to.be.an('object');
      expect(res.name).to.be.equal('John');
      expect(res.age).to.be.equal(30);
    });
  });
});
