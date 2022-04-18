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
    before(() => Sinon.stub(carModel.model, 'create')
      .onFirstCall().resolves(carMock)
      .onSecondCall().throws()
      .onThirdCall().throws());
  
    after(()=> Sinon.restore());
  
    it('should return status 201 and a new car created when data is valid', async () => {
      const chaiHttpResponse = await chai.request(app).post('/cars').send(carBodyMock);
  
      expect(chaiHttpResponse).to.have.status(201);
      expect(chaiHttpResponse.body).to.be.deep.eq(carMock);
    });

    it('should return status 400 and a ZodError message when data is invalid', async () => {
      const chaiHttpResponse = await chai.request(app).post('/cars').send(invalidCarBodyMock);

      expect(chaiHttpResponse).to.have.status(400);
      expect(chaiHttpResponse.body.error.name).to.be.eq('ZodError');
    });

    it('should return status 500 and an "Internal Server Error" message', async () => {
      const chaiHttpResponse = await chai.request(app).post('/cars').send(carMock);

      expect(chaiHttpResponse).to.have.status(500);
      expect(chaiHttpResponse.body.error).to.be.eq('Internal Server Error');
    });
  });

  describe('read', () => {
    before(() => Sinon.stub(carModel.model, 'find')
      .onFirstCall().resolves(carListMock as any[])
      .onSecondCall().throws());
  
    after(()=> Sinon.restore());
  
    it('should return status 200 and a list of all cars', async () => {
      const chaiHttpResponse = await chai.request(app).get('/cars').send();
  
      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.be.deep.eq(carListMock);
    });
  
    it('should return status 500 and an "Internal Server Error" message', async () => {
      const chaiHttpResponse = await chai.request(app).get('/cars').send();
  
      expect(chaiHttpResponse).to.have.status(500);
      expect(chaiHttpResponse.body.error).to.be.eq('Internal Server Error');
    });
  });

  describe('readOne', () => {
    before(() => Sinon.stub(carModel.model, 'findById')
      .onFirstCall().resolves(carMock as any)
      .onSecondCall().throws()
      .onThirdCall().throws());
  
    after(()=> Sinon.restore());
  
    it('should return status 200 and a car when the id is valid', async () => {
      const chaiHttpResponse = await chai.request(app).get(`/cars/${carMock._id}`).send();
  
      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.be.deep.eq(carMock);
    });
    
    it('should return status 400 and an invalid id error message when the id is invalid', async () => {
      const chaiHttpResponse = await chai.request(app).get(`/cars/123456`).send(invalidCarBodyMock);

      expect(chaiHttpResponse).to.have.status(400);
      expect(chaiHttpResponse.body.error).to.be.eq('Id must have 24 hexadecimal characters');
    });

    it('should return status 500 and an "Internal Server Error" message', async () => {
      const chaiHttpResponse = await chai.request(app).get(`/cars/${carMock._id}`).send(carBodyMock);
  
      expect(chaiHttpResponse).to.have.status(500);
      expect(chaiHttpResponse.body.error).to.be.eq('Internal Server Error');
    });
  });

  describe('update', () => {
    before(() => Sinon.stub(carModel.model, 'findByIdAndUpdate')
    .onFirstCall().resolves({ ...carMock, doorsQty: 4 } as any)
    .onSecondCall().throws()
    .onThirdCall().throws());
  
    after(()=> Sinon.restore());
  
    it('should return status 200 and an updated car when the id and data are valid', async () => {
      const chaiHttpResponse = await chai.request(app).put(`/cars/${carMock._id}`).send({ doorsQty: 4 });

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.be.deep.eq({ ...carMock, doorsQty: 4 });
    });
  
    
    it('should return status 400 and an invalid id error message when the id is invalid', async () => {
      const chaiHttpResponse = await chai.request(app).put('/cars/123456').send({ doorsQty: 4 });

      expect(chaiHttpResponse).to.have.status(400);
      expect(chaiHttpResponse.body.error).to.be.eq('Id must have 24 hexadecimal characters');
    });

    it('should return status 500 and an "Internal Server Error" message', async () => {
      const chaiHttpResponse = await chai.request(app).put(`/cars/${carMock._id}`).send({ doorsQty: 4 });
  
      expect(chaiHttpResponse).to.have.status(500);
      expect(chaiHttpResponse.body.error).to.be.eq('Internal Server Error');
    });
  });

  describe('delete', () => {
    before(() => Sinon.stub(carModel.model, 'findByIdAndDelete')
      .onFirstCall().resolves({ ...carMock, doorsQty: 4 } as any)
      .onSecondCall().throws()
      .onThirdCall().throws());
  
    after(()=> Sinon.restore());
  
    it('should return status 204 when the id is valid', async () => {
      const chaiHttpResponse = await chai.request(app).delete(`/cars/${carMock._id}`).send();

      expect(chaiHttpResponse).to.have.status(204);
      expect(chaiHttpResponse.body).to.be.empty;
    });
    
    it('should return status 400 and an invalid id error message when the id is invalid', async () => {
      const chaiHttpResponse = await chai.request(app).delete('/cars/123456').send();
      
      expect(chaiHttpResponse).to.have.status(400);
      expect(chaiHttpResponse.body.error).to.be.eq('Id must have 24 hexadecimal characters');
    });

    it('should return status 500 and an "Internal Server Error" message', async () => {
      const chaiHttpResponse = await chai.request(app).delete(`/cars/${carMock._id}`).send();
  
      expect(chaiHttpResponse).to.have.status(500);
      expect(chaiHttpResponse.body.error).to.be.eq('Internal Server Error');
    });
  });
});

describe('MotorcycleController', () => {
  const motorcycleModel = new MotorcycleModel();

  describe('create', () => {
    before(() => Sinon.stub(motorcycleModel.model, 'create')
      .onFirstCall().resolves(motoMock)
      .onSecondCall().throws()
      .onThirdCall().throws());
  
    after(()=> Sinon.restore());
  
    it('should return status 201 and a new motorcycle created when data is valid', async () => {
      const chaiHttpResponse = await chai.request(app).post('/motorcycles').send(motoBodyMock);
  
      expect(chaiHttpResponse).to.have.status(201);
      expect(chaiHttpResponse.body).to.be.deep.eq(motoMock);
    });
    
    it('should return status 400 and a ZodError message when data is invalid', async () => {
      const chaiHttpResponse = await chai.request(app).post('/motorcycles').send(invalidMotoBodyMock);
      
      expect(chaiHttpResponse).to.have.status(400);
      expect(chaiHttpResponse.body.error.name).to.be.eq('ZodError');
    });
    
      it('should return status 500 and an "Internal Server Error" message', async () => {
        const chaiHttpResponse = await chai.request(app).post('/motorcycles').send(motoBodyMock);
    
        expect(chaiHttpResponse).to.have.status(500);
        expect(chaiHttpResponse.body.error).to.be.eq('Internal Server Error');
      });
  });

  describe('read', () => {
    before(() => Sinon.stub(motorcycleModel.model, 'find')
      .onFirstCall().resolves(motoListMock as any[])
      .onSecondCall().throws());
  
    after(()=> Sinon.restore());
  
    it('should return status 200 and a list of all motorcycles', async () => {
      const chaiHttpResponse = await chai.request(app).get('/motorcycles').send();
  
      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.be.deep.eq(motoListMock);
    });
  
    it('should return status 500 and an "Internal Server Error" message', async () => {
      const chaiHttpResponse = await chai.request(app).get('/motorcycles').send();

      expect(chaiHttpResponse).to.have.status(500);
      expect(chaiHttpResponse.body.error).to.be.eq('Internal Server Error');
    });
  });

  describe('readOne', () => {
    before(() => Sinon.stub(motorcycleModel.model, 'findById')
      .onFirstCall().resolves(motoMock as any)
      .onSecondCall().throws()
      .onThirdCall().throws());
  
    after(()=> Sinon.restore());
  
    it('should return status 200 and a motorcycle when the id is valid', async () => {
      const chaiHttpResponse = await chai.request(app).get(`/motorcycles/${motoMock._id}`).send();
  
      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.be.deep.eq(motoMock);
    });
    
    it('should return status 400 and an invalid id error message when the id is invalid', async () => {
      const chaiHttpResponse = await chai.request(app).get(`/motorcycles/123456`).send(invalidMotoBodyMock);
      
      expect(chaiHttpResponse).to.have.status(400);
      expect(chaiHttpResponse.body.error).to.be.eq('Id must have 24 hexadecimal characters');
    });
    
      it('should return status 500 and an "Internal Server Error" message', async () => {
        const chaiHttpResponse = await chai.request(app).get(`/motorcycles/${motoMock._id}`).send(motoBodyMock);
    
        expect(chaiHttpResponse).to.have.status(500);
        expect(chaiHttpResponse.body.error).to.be.eq('Internal Server Error');
      });
  });

  describe('update', () => {
    before(() => Sinon.stub(motorcycleModel.model, 'findByIdAndUpdate')
      .onFirstCall().resolves({ ...motoMock, doorsQty: 4 } as any)
      .onSecondCall().throws()
      .onThirdCall().throws());
  
    after(()=> Sinon.restore());
  
    it('should return status 200 and an updated motorcycle when the id and data are valid', async () => {
      const chaiHttpResponse = await chai.request(app).put(`/motorcycles/${motoMock._id}`).send({ doorsQty: 4 });

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.be.deep.eq({ ...motoMock, doorsQty: 4 });
    });
    
    it('should return status 400 and an invalid id error message when the id is invalid', async () => {
      const chaiHttpResponse = await chai.request(app).put('/motorcycles/123456').send({ doorsQty: 4 });
      
      expect(chaiHttpResponse).to.have.status(400);
      expect(chaiHttpResponse.body.error).to.be.eq('Id must have 24 hexadecimal characters');
    });
    
      it('should return status 500 and an "Internal Server Error" message', async () => {
        const chaiHttpResponse = await chai.request(app).put(`/motorcycles/${motoMock._id}`).send({ doorsQty: 4 });
    
        expect(chaiHttpResponse).to.have.status(500);
        expect(chaiHttpResponse.body.error).to.be.eq('Internal Server Error');
      });
  });

  describe('delete', () => {
    before(() => Sinon.stub(motorcycleModel.model, 'findByIdAndDelete')
      .onFirstCall().resolves({ ...motoMock, doorsQty: 4 } as any)
      .onSecondCall().throws()
      .onThirdCall().throws());
  
    after(()=> Sinon.restore());
  
    it('should return status 204 when the id is valid', async () => {
      const chaiHttpResponse = await chai.request(app).delete(`/motorcycles/${motoMock._id}`).send();

      expect(chaiHttpResponse).to.have.status(204);
      expect(chaiHttpResponse.body).to.be.empty;
    });
    
    it('should return status 400 and an invalid id error message when the id is invalid', async () => {
      const chaiHttpResponse = await chai.request(app).delete('/motorcycles/123456').send();

      expect(chaiHttpResponse).to.have.status(400);
      expect(chaiHttpResponse.body.error).to.be.eq('Id must have 24 hexadecimal characters');
    });
    
      it('should return status 500 and an "Internal Server Error" message', async () => {
        const chaiHttpResponse = await chai.request(app).delete(`/motorcycles/${motoMock._id}`).send();
    
        expect(chaiHttpResponse).to.have.status(500);
        expect(chaiHttpResponse.body.error).to.be.eq('Internal Server Error');
      });
  });
});
