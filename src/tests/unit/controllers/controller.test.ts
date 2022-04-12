// import Sinon from 'sinon';
// import chai from 'chai';
// import chaiHttp = require('chai-http');
// import CarController from '../../../controllers/CarController';

// // import { Response } from 'superagent';
// import { carBodyMock, carMock } from '../mocks/carMocks';
// import server from '../../../server';

// chai.use(chaiHttp);

// const { expect } = chai;

// describe('CarController', () => {
//   // let chaiHttpResponse: Response;
//   let carController = new CarController();

//   before(async () => Sinon.stub(carController.service, 'create').resolves(carMock));

//   after(()=> Sinon.restore());

//   it('should return status 201', async () => {
//     const chaiHttpResponse = await chai.request(server).post('/cars').send(carBodyMock);

//     expect(chaiHttpResponse).to.have.status(201);
//   });
// });