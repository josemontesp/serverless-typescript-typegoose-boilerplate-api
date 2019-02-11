"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const chaiHttp = require("chai-http");
const app_1 = require("../../app");
process.env.NODE_ENV = 'testing';
const expect = chai.expect;
chai.use(chaiHttp);
describe('Api Author', () => {
    it.skip('should be able to create user', (done) => {
        chai
            .request(app_1.server)
            .post('/api/author')
            .set('content-type', 'application/json')
            .send({
            description: '...',
            name: 'Someone',
        })
            .end(async (err, res) => {
            expect(res.statusCode).to.be.equal(200);
            expect(res.body.name).to.be.equal('Someone');
            done();
        });
    });
    it.skip('should be able to get users', (done) => {
        chai
            .request(app_1.server)
            .get('/api/author')
            .end((err, res) => {
            expect(res.statusCode).to.be.equal(200);
            expect(res.body.length).to.be.equal(2);
            done();
        });
    });
});
