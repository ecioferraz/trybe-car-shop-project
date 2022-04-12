import { Response } from 'express';
import Controller, { IRequestWithBody, ResponseError } from '.';
import CarService from '../services/CarService';
import { Car } from '../interfaces/CarInterface';

export default class CarController extends Controller<Car> {
  constructor(
    public service = new CarService(),
    private $route = '/cars',
  ) {
    super(service);
  }

  get route() { return this.$route; }

  public create = async (
    req: IRequestWithBody<Car>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const car = await this.service.create(req.body);

      if (!car) return res.status(500).json({ error: this.errors.internal });

      if ('error' in car) return res.status(400).json(car);

      return res.status(201).json(car);
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };
}
