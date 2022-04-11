import { expect } from 'chai';
import Sinon from 'sinon';
import CarModel from '../../../models/CarModel';
import { carMock } from '../mocks/carMocks';

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
});
