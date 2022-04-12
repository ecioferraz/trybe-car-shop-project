import { expect } from 'chai';
import Sinon from 'sinon';
import { Motorcycle } from '../../../interfaces/MotorcycleInterface';
import CarModel from '../../../models/CarModel';
import MotorcycleModel from '../../../models/MotorcycleModel';
import { carMock, carListMock } from '../mocks/carMocks';
import { motoMock, motoListMock } from '../mocks/motocycleMocks';

describe('CarModel', () => {
  const carModel = new CarModel();

  describe('create', () => {
    before(() => Sinon.stub(carModel.model, 'create').resolves(carMock));

    after(() => Sinon.restore());

    it('should return a new car created', async () => {
      const car = await carModel.create(carMock);

      expect(car).to.be.deep.eq(carMock);
    });
  });

  describe('read', () => {
    before(() => Sinon.stub(carModel.model, 'find').resolves(carListMock as any[]));

    after(() => Sinon.restore());

    it('should return a list of all cars', async () => {
      const car = await carModel.read();

      expect(car).to.be.deep.eq(carListMock);
    });
  });

  describe('readOne', () => {
    before(() => Sinon.stub(carModel.model, 'findById').resolves(carMock as any));

    after(() => Sinon.restore());

    it('should return a car', async () => {
      const car = await carModel.readOne(carMock._id);

      expect(car).to.be.deep.eq(carMock);
    });
  });

  describe('update', () => {
    before(() => Sinon.stub(carModel.model, 'findByIdAndUpdate').resolves({ ...carMock, doorsQty: 4 } as any));

    after(() => Sinon.restore());

    it('should return an updated car', async () => {
      const car = await carModel.update(carMock._id, { ...carMock, doorsQty: 4 });

      expect(car).to.be.deep.eq({ ...carMock, doorsQty: 4 });
    });
  });

  describe('delete', () => {
    before(() => Sinon.stub(carModel.model, 'findByIdAndDelete').resolves(carMock as any));

    after(() => Sinon.restore());

    it('should return an deleted car', async () => {
      const car = await carModel.delete(carMock._id);

      expect(car).to.be.deep.eq(carMock);
    });
  });
});

describe('MotorcycleModel', () => {
  let motorcycleModel = new MotorcycleModel();

  describe('create', () => {
    before(() => Sinon.stub(motorcycleModel.model, 'create').resolves(motoMock));

    after(() => Sinon.restore());

    it('should return a new motorcycle created', async () => {
      const motorcycle = await motorcycleModel.create(motoMock as Motorcycle);

      expect(motorcycle).to.be.deep.eq(motoMock);
    });
  });

  describe('read', () => {
    before(() => Sinon.stub(motorcycleModel.model, 'find').resolves(motoListMock as any[]));

    after(() => Sinon.restore());

    it('should return a list of all motorcycles', async () => {
      const motorcycle = await motorcycleModel.read();

      expect(motorcycle).to.be.deep.eq(motoListMock);
    });
  });

  describe('readOne', () => {
    before(() => Sinon.stub(motorcycleModel.model, 'findById').resolves(motoMock as any));

    after(() => Sinon.restore());

    it('should return a motorcycle', async () => {
      const motorcycle = await motorcycleModel.readOne(motoMock._id);

      expect(motorcycle).to.be.deep.eq(motoMock);
    });
  });

  describe('update', () => {
    before(() => Sinon.stub(motorcycleModel.model, 'findByIdAndUpdate').resolves({ ...motoMock, doorsQty: 4 } as any));

    after(() => Sinon.restore());

    it('should return an updated motorcycle', async () => {
      const motorcycle = await motorcycleModel.update(motoMock._id, { ...motoMock, color: "black" } as Motorcycle);

      expect(motorcycle).to.be.deep.eq({ ...motoMock, doorsQty: 4 });
    });
  });

  describe('delete', () => {
    before(() => Sinon.stub(motorcycleModel.model, 'findByIdAndDelete').resolves(motoMock as any));

    after(() => Sinon.restore());

    it('should return an deleted motorcycle', async () => {
      const motorcycle = await motorcycleModel.delete(motoMock._id);

      expect(motorcycle).to.be.deep.eq(motoMock);
    });
  });
});
