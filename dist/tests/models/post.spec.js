"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const models_1 = require("../../models/models");
process.env.NODE_ENV = 'testing';
const expect = chai.expect;
describe('Posts', () => {
    it('should insert new post', (done) => {
        const author = new models_1.AuthorModel();
        author.name = 'John';
        author.description = 'He is writer';
        author.save((err, res) => __awaiter(this, void 0, void 0, function* () {
            expect(res).to.be.an('object');
            expect(res.name).to.be.equal('John');
            yield models_1.Post.create({
                author: res._id,
                description: 'Lorem ipsum...',
                title: 'Tile 1',
            }, {
                author: res._id,
                description: 'Lorem ipsum...',
                title: 'Tile 2',
            });
            const posts = yield models_1.Post.findAllByAuthor(res._id.toString());
            expect(posts).to.be.length(2);
            done();
        }));
    });
});
