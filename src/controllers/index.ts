import { Request, Response } from 'express';
import { IVehicle } from '../interfaces/VehicleInterface';
import Service from '../services';

export type ResponseError = {
  error: unknown,
};

export interface IRequestWithBody<T> extends Request {
  body: T,
}

enum ControllerErros {
  internal = 'Internal Server Error',
  notFound = 'Object not found',
  requiredId = 'Id is required',
  badRequest = 'Bad request',
  invalidId = 'Id must have 24 hexadecimal characters',
}

enum StatusCode {
  OK = 200,
  CREATED,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL = 500,
}

export default abstract class Controller<T> {
  abstract route: string;

  protected errors = ControllerErros;

  protected status = StatusCode;

  constructor(protected service: Service<T>) { }

  public abstract create(
    req: IRequestWithBody<T>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res>;

  public read = async (
    _req: Request,
    res: Response<T[] | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const objs = await this.service.read();

      return res.json(objs);
    } catch (error) {
      return res
        .status(this.status.INTERNAL)
        .json({ error: this.errors.internal });
    }
  };

  public abstract readOne(
    req: Request<{ id: IVehicle['id'] }>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res>;

  public abstract update(
    req: Request<{ id: IVehicle['id'] }>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res>;

  public abstract delete(
    req: Request<{ id: IVehicle['id'] }>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res | void>;
}
