import { expect } from 'chai';
import Sinon from 'sinon';
import CarModel from '../../../models/CarModel';
import { carMock, carMockList } from '../mocks/carMocks';

describe('CarModel', () => {
  let carModel = new CarModel();

  describe('create', () => {
    before(() => Sinon.stub(carModel.model, 'create').resolves(carMock));

    after(() => Sinon.restore());

    it('should return a new car created', async () => {
      const car = await carModel.create(carMock);

      expect(car).to.be.deep.eq(carMock);
    });
  });

  // describe('read', () => {
  //   before(() => Sinon.stub(carModel.model, 'find').resolves(carMockList));

  //   after(() => Sinon.restore());

  //   it('should return a list of all cars', async () => {
  //     const car = await carModel.read();

  //     expect(car).to.be.deep.eq(carMockList);
  //   });
  // });

  // describe('readOne', () => {
  //   before(() => Sinon.stub(carModel.model, 'findById').resolves(carMock));

  //   after(() => Sinon.restore());

  //   it('should return a car', async () => {
  //     const car = await carModel.readOne(carMock._id);

  //     expect(car).to.be.deep.eq(carMock);
  //   });
  // });
});
