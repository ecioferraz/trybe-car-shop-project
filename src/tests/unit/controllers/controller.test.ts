import Sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');

import server from '../../../server';
import CarModel from '../../../models/CarModel';
import MotorcycleModel from '../../../models/MotorcycleModel';
import {
  carBodyMock,
  carListMock,
  carMock,
  invalidCarBodyMock } from '../mocks/carMocks';
import {
  invalidMotoBodyMock,
  motoBodyMock, motoListMock,
  motoMock } from '../mocks/motocycleMocks';

chai.use(chaiHttp);

const { expect } = chai;

const app = server.getApp();

describe('CarController', () => {
  const carModel = new CarModel();

  describe('create', () => {
    before(() => Sinon.stub(carModel.model, 'create').resolves(carMock));
  
    after(()=> Sinon.restore());
  
    it('should return status 201 when data is valid', async () => {
      const chaiHttpResponse = await chai.request(app).post('/cars').send(carBodyMock);
  
      expect(chaiHttpResponse).to.have.status(201);
    });
  
    it('should return a new car created when data is valid', async () => {
      const chaiHttpResponse = await chai.request(app).post('/cars').send(carBodyMock);
  
      expect(chaiHttpResponse.body).to.be.deep.eq(carMock);
    });

    it('should return status 400 when data is invalid', async () => {
      const chaiHttpResponse = await chai.request(app).post('/cars').send(invalidCarBodyMock);
  
      expect(chaiHttpResponse).to.have.status(400);
    });
  });

  describe('read', () => {
    before(() => Sinon.stub(carModel.model, 'find').resolves(carListMock as any[]));
  
    after(()=> Sinon.restore());
  
    it('should return status 200', async () => {
      const chaiHttpResponse = await chai.request(app).get('/cars').send();
  
      expect(chaiHttpResponse).to.have.status(200);
    });
  
    it('should return a list of all cars', async () => {
      const chaiHttpResponse = await chai.request(app).get('/cars').send();
  
      expect(chaiHttpResponse.body).to.be.deep.eq(carListMock);
    });
  });

  describe('readOne', () => {
    before(() => Sinon.stub(carModel.model, 'findById').resolves(carMock as any));
  
    after(()=> Sinon.restore());
  
    it('should return status 200 when the id is valid', async () => {
      const chaiHttpResponse = await chai.request(app).get(`/cars/${carMock._id}`).send();
  
      expect(chaiHttpResponse).to.have.status(200);
    });
  
    it('should return a car when the id is valid', async () => {
      const chaiHttpResponse = await chai.request(app).get(`/cars/${carMock._id}`).send(carBodyMock);
  
      expect(chaiHttpResponse.body).to.be.deep.eq(carMock);
    });

    it('should return status 400 when the id is invalid', async () => {
      const chaiHttpResponse = await chai.request(app).get(`/cars/123456`).send(invalidCarBodyMock);
  
      expect(chaiHttpResponse).to.have.status(400);
    });
  });

  describe('update', () => {
    before(() => Sinon.stub(carModel.model, 'findByIdAndUpdate').resolves({ ...carMock, doorsQty: 4 } as any));
  
    after(()=> Sinon.restore());
  
    it('should return status 200 when the id and data are valid', async () => {
      const chaiHttpResponse = await chai.request(app).put(`/cars/${carMock._id}`).send({ doorsQty: 4 });

      expect(chaiHttpResponse).to.have.status(200);
    });
  
    it('should return an updated car created when the id data are valid', async () => {
      const chaiHttpResponse = await chai.request(app).put(`/cars/${carMock._id}`).send({ doorsQty: 4 });
  
      expect(chaiHttpResponse.body).to.be.deep.eq({ ...carMock, doorsQty: 4 });
    });

    it('should return status 400 when the id is invalid', async () => {
      const chaiHttpResponse = await chai.request(app).put('/cars/123456').send({ doorsQty: 4 });
  
      expect(chaiHttpResponse).to.have.status(400);
    });
  });

  describe('delete', () => {
    before(() => Sinon.stub(carModel.model, 'findByIdAndDelete').resolves({ ...carMock, doorsQty: 4 } as any));
  
    after(()=> Sinon.restore());
  
    it('should return status 204 when the id is valid', async () => {
      const chaiHttpResponse = await chai.request(app).delete(`/cars/${carMock._id}`).send();

      expect(chaiHttpResponse).to.have.status(204);
    });
  
    it('should return the car deleted when the id is valid', async () => {
      const chaiHttpResponse = await chai.request(app).delete(`/cars/${carMock._id}`).send();
  
      expect(chaiHttpResponse.body).to.be.empty;
    });

    it('should return status 400 when the id is invalid', async () => {
      const chaiHttpResponse = await chai.request(app).delete('/cars/123456').send();
  
      expect(chaiHttpResponse).to.have.status(400);
    });
  });
});

describe('MotorcycleController', () => {
  const motorcycleModel = new MotorcycleModel();

  describe('create', () => {
    before(() => Sinon.stub(motorcycleModel.model, 'create').resolves(motoMock));
  
    after(()=> Sinon.restore());
  
    it('should return status 201 when data is valid', async () => {
      const chaiHttpResponse = await chai.request(app).post('/motorcycles').send(motoBodyMock);
  
      expect(chaiHttpResponse).to.have.status(201);
    });
  
    it('should return a new car created when data is valid', async () => {
      const chaiHttpResponse = await chai.request(app).post('/motorcycles').send(motoBodyMock);
  
      expect(chaiHttpResponse.body).to.be.deep.eq(motoMock);
    });

    it('should return status 400 when data is invalid', async () => {
      const chaiHttpResponse = await chai.request(app).post('/motorcycles').send(invalidMotoBodyMock);
  
      expect(chaiHttpResponse).to.have.status(400);
    });
  });

  describe('read', () => {
    before(() => Sinon.stub(motorcycleModel.model, 'find').resolves(motoListMock as any[]));
  
    after(()=> Sinon.restore());
  
    it('should return status 200', async () => {
      const chaiHttpResponse = await chai.request(app).get('/motorcycles').send();
  
      expect(chaiHttpResponse).to.have.status(200);
    });
  
    it('should return a list of all motorcycles', async () => {
      const chaiHttpResponse = await chai.request(app).get('/motorcycles').send();
  
      expect(chaiHttpResponse.body).to.be.deep.eq(motoListMock);
    });
  });

  describe('readOne', () => {
    before(() => Sinon.stub(motorcycleModel.model, 'findById').resolves(motoMock as any));
  
    after(()=> Sinon.restore());
  
    it('should return status 200 when the id is valid', async () => {
      const chaiHttpResponse = await chai.request(app).get(`/motorcycles/${motoMock._id}`).send();
  
      expect(chaiHttpResponse).to.have.status(200);
    });
  
    it('should return a motorcycle when the id is valid', async () => {
      const chaiHttpResponse = await chai.request(app).get(`/motorcycles/${motoMock._id}`).send(motoBodyMock);
  
      expect(chaiHttpResponse.body).to.be.deep.eq(motoMock);
    });

    it('should return status 400 when the id is invalid', async () => {
      const chaiHttpResponse = await chai.request(app).get(`/motorcycles/123456`).send(invalidMotoBodyMock);
  
      expect(chaiHttpResponse).to.have.status(400);
    });
  });

  describe('update', () => {
    before(() => Sinon.stub(motorcycleModel.model, 'findByIdAndUpdate').resolves({ ...motoMock, doorsQty: 4 } as any));
  
    after(()=> Sinon.restore());
  
    it('should return status 200 when the id and data are valid', async () => {
      const chaiHttpResponse = await chai.request(app).put(`/motorcycles/${motoMock._id}`).send({ doorsQty: 4 });

      expect(chaiHttpResponse).to.have.status(200);
    });
  
    it('should return an updated motorcycle created when the id data are valid', async () => {
      const chaiHttpResponse = await chai.request(app).put(`/motorcycles/${motoMock._id}`).send({ doorsQty: 4 });
  
      expect(chaiHttpResponse.body).to.be.deep.eq({ ...motoMock, doorsQty: 4 });
    });

    it('should return status 400 when the id is invalid', async () => {
      const chaiHttpResponse = await chai.request(app).put('/motorcycles/123456').send({ doorsQty: 4 });
  
      expect(chaiHttpResponse).to.have.status(400);
    });
  });

  describe('delete', () => {
    before(() => Sinon.stub(motorcycleModel.model, 'findByIdAndDelete').resolves({ ...motoMock, doorsQty: 4 } as any));
  
    after(()=> Sinon.restore());
  
    it('should return status 204 when the id is valid', async () => {
      const chaiHttpResponse = await chai.request(app).delete(`/motorcycles/${motoMock._id}`).send();

      expect(chaiHttpResponse).to.have.status(204);
    });
  
    it('should return the motorcycle deleted when the id is valid', async () => {
      const chaiHttpResponse = await chai.request(app).delete(`/motorcycles/${motoMock._id}`).send();
  
      expect(chaiHttpResponse.body).to.be.empty;
    });

    it('should return status 400 when the id is invalid', async () => {
      const chaiHttpResponse = await chai.request(app).delete('/motorcycles/123456').send();
  
      expect(chaiHttpResponse).to.have.status(400);
    });
  });
});

// describe('CarController', () => {
//   let carController = new CarController();

//   describe('create', () => {
//     const req = { } as IRequestWithBody<Car>;
//     const res = { } as Response;
  
//     before(() => {
//       req.body = carBodyMock;
//       res.status = Sinon.stub().returns(res);
//       res.json = Sinon.stub().returns(null);

//       Sinon.stub(carController, 'create').resolves(carMock as any);
//     });
  
//     after(()=> Sinon.restore());
  
//     it('should return status 201', async () => {
//       // const chaiHttpResponse = await chai.request(server).post('/cars').send(carBodyMock);
//       await carController.create(req, res);

//       expect((res.status as Sinon.SinonStub).calledWith(201)).to.be.eq(true);
//     });
//   });
// });