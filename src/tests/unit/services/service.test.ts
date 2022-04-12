import { expect } from "chai";
import Sinon from "sinon";
import CarService from "../../../services/CarService";
import { carMock, carMockList } from "../mocks/carMocks";

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

  describe('read', () => {
    before(() => Sinon.stub(carService.model, 'read').resolves(carMockList));

    after(() => Sinon.restore());

    it('should return a list of cars', async () => {
      const car = await carService.read();

      expect(car).to.be.deep.eq(carMockList);
    });
  });

  describe('readOne', () => {
    before(() => Sinon.stub(carService.model, 'readOne').resolves(carMock));

    after(() => Sinon.restore());

    it('should return a car', async () => {
      const car = await carService.readOne(carMock._id);

      expect(car).to.be.deep.eq(carMock);
    });
  });

  describe('update', () => {
    before(() => Sinon.stub(carService.model, 'update').resolves({ ...carMock, doorsQty: 4 }));

    after(() => Sinon.restore());

    it('should return an updated car', async () => {
      const car = await carService.update(carMock._id, { ...carMock, doorsQty: 4 });

      expect(car).to.be.deep.eq({ ...carMock, doorsQty: 4 });
    });
  });

  describe('delete', () => {
    before(() => Sinon.stub(carService.model, 'delete').resolves(carMock));

    after(() => Sinon.restore());

    it('should return an deleted car', async () => {
      const car = await carService.delete(carMock._id);

      expect(car).to.be.deep.eq(carMock);
    });
  });
});
