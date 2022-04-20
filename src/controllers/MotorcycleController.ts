import { Document, isValidObjectId } from 'mongoose';
import { Request, Response } from 'express';
import Controller, { IRequestWithBody, ResponseError } from '.';
import MotorcycleService from '../services/MotorcycleService';
import { Motorcycle } from '../interfaces/MotorcycleInterface';

export default class MotorcycleController extends Controller<Motorcycle> {
  constructor(
    public service = new MotorcycleService(),
    private $route = '/motorcycles',
  ) {
    super(service);
  }

  get route() { return this.$route; }

  public create = async (
    req: IRequestWithBody<Motorcycle>,
    res: Response<Motorcycle | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const motorcycle = await this.service.create(req.body);

      if (!motorcycle) {
        return res
          .status(this.status.INTERNAL).json({ error: this.errors.internal });
      }

      if ('error' in motorcycle) {
        return res.status(this.status.BAD_REQUEST).json(motorcycle);
      }

      return res.status(this.status.CREATED).json(motorcycle);
    } catch (error) {
      return res
        .status(this.status.INTERNAL).json({ error: this.errors.internal });
    }
  };

  public readOne = async (
    req: Request<{ id: Document['id'] }>,
    res: Response<Motorcycle | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const { id } = req.params;

      if (!isValidObjectId(id)) {
        return res
          .status(this.status.BAD_REQUEST)
          .json({ error: this.errors.invalidId });
      }

      const motorcycle = await this.service.readOne(id);

      return motorcycle ? res.json(motorcycle)
        : res
          .status(this.status.NOT_FOUND).json({ error: this.errors.notFound });
    } catch (error) {
      return res
        .status(this.status.INTERNAL).json({ error: this.errors.internal });
    }
  };

  public update = async (
    req: Request<{ id: Document['id'] }>,
    res: Response<Motorcycle | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const { id } = req.params;

      if (!isValidObjectId(id)) {
        return res
          .status(this.status.BAD_REQUEST)
          .json({ error: this.errors.invalidId });
      }

      const motorcycle = await this.service.update(id, req.body);
      
      return motorcycle ? res.json(motorcycle)
        : res
          .status(this.status.NOT_FOUND).json({ error: this.errors.notFound });
    } catch (error) {
      return res
        .status(this.status.INTERNAL).json({ error: this.errors.internal });
    }
  };

  public delete = async (
    req: Request<{ id: Document['id'] }>,
    res: Response<Motorcycle | ResponseError>,
  ): Promise<typeof res | void> => {
    try {
      const { id } = req.params;

      if (!isValidObjectId(id)) {
        return res
          .status(this.status.BAD_REQUEST)
          .json({ error: this.errors.invalidId });
      }

      const motorcycle = await this.service.delete(id);

      return motorcycle ? res.status(this.status.NO_CONTENT).end()
        : res
          .status(this.status.NOT_FOUND).json({ error: this.errors.notFound });
    } catch (error) {
      return res
        .status(this.status.INTERNAL).json({ error: this.errors.internal });
    }
  };
}
