// import Sinon from 'sinon';
// import chai from 'chai';
// import chaiHttp = require('chai-http');
// import CarModel from '../../../models/CarModel';

// import { Response } from 'superagent';
// import { carMock } from '../mocks/carMocks';
// import server from '../../../server';

// chai.use(chaiHttp);

// const { expect } = chai;

// describe('CarController', () => {
//   let chaiHttpResponse: Response;
//   let carModel = new CarModel();

//   before(async () => Sinon.stub(carModel.model, 'create').resolves(carMock));

//   after(()=> Sinon.restore());

//   it('should return status 201', async () => {
//     chaiHttpResponse = await chai.request(server).post('/cars');

//     expect(chaiHttpResponse).to.have.status(201);
//   });
// });