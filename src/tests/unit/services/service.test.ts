import { expect } from "chai";
import Sinon from "sinon";
import CarService from "../../../services/CarService";
import { carMock } from "../mocks/carMocks";

describe('CarService', () => {
  let carService = new CarService();

  describe('create', () => {
    before(() => Sinon.stub(carService.model, 'create').resolves(carMock));

    after(() => Sinon.restore());

    it('should return a new car created', async () => {
      const car = await carService.create(carMock);

      expect(car).to.be.deep.eq(carMock);
    });
  });
});
