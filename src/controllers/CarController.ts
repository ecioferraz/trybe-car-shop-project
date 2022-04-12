import { isValidObjectId } from 'mongoose';
import { Request, Response } from 'express';
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

      if (!car) {
        return res
          .status(this.status.INTERNAL).json({ error: this.errors.internal });
      }

      if ('error' in car) return res.status(this.status.BAD_REQUEST).json(car);

      return res.status(this.status.CREATED).json(car);
    } catch (error) {
      return res
        .status(this.status.INTERNAL).json({ error: this.errors.internal });
    }
  };

  public readOne = async (
    req: Request<{ id: string }>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const { id } = req.params;

      if (!isValidObjectId(id)) {
        return res
          .status(this.status.BAD_REQUEST)
          .json({ error: this.errors.invalidId });
      }

      const car = await this.service.readOne(id);

      return car ? res.json(car)
        : res
          .status(this.status.NOT_FOUND).json({ error: this.errors.notFound });
    } catch (error) {
      return res
        .status(this.status.INTERNAL).json({ error: this.errors.internal });
    }
  };

  public update = async (
    req: Request<{ id: string }>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const { id } = req.params;

      if (!isValidObjectId(id)) {
        return res
          .status(this.status.BAD_REQUEST)
          .json({ error: this.errors.invalidId });
      }

      const car = await this.service.update(id, req.body);

      return car ? res.json(car)
        : res
          .status(this.status.NOT_FOUND).json({ error: this.errors.notFound });
    } catch (error) {
      return res
        .status(this.status.INTERNAL).json({ error: this.errors.internal });
    }
  };

  public delete = async (
    req: Request<{ id: string }>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res | void> => {
    try {
      const { id } = req.params;

      if (!isValidObjectId(id)) {
        return res
          .status(this.status.BAD_REQUEST)
          .json({ error: this.errors.invalidId });
      }

      const car = await this.service.delete(id);

      return car ? res.status(this.status.NO_CONTENT).end()
        : res
          .status(this.status.NOT_FOUND).json({ error: this.errors.notFound });
    } catch (error) {
      return res
        .status(this.status.INTERNAL).json({ error: this.errors.internal });
    }
  };
}
