process.env.NODE_ENV = 'testing';

// const expect = chai.expect;
// chai.use(chaiHttp);

// describe('Api Author', () => {
//   it.skip('should be able to create user', (done): void => {
//     chai
//       .request(server)
//       .post('/api/author')
//       .set('content-type', 'application/json')
//       .send({
//         description: '...',
//         name: 'Someone',
//       })
//       .end(async (err: Error, res: any) => {
//         expect(res.statusCode).to.be.equal(200);
//         expect(res.body.name).to.be.equal('Someone');
//         done();
//       });
//   });

//   it.skip('should be able to get users', (done): void => {
//     chai
//       .request(server)
//       .get('/api/author')
//       .end(
//         (err: Error, res: any): void => {
//           expect(res.statusCode).to.be.equal(200);
//           expect(res.body.length).to.be.equal(2);
//           done();
//         },
//       );
//   });
// });
