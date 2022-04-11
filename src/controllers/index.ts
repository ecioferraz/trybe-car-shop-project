import { Request, Response } from 'express';
import Service from '../services';

export type ResponseError = {
  error: unknown,
};

export interface IRequestWithBody<T> extends Request {
  body: T,
}

enum ControllerErros {
  internal = 'Internal Server Error',
  notFound = 'Car not found',
  requiredId = 'Id is required',
  badRequest = 'Bad request',
}

export default abstract class Controller<T> {
  abstract route: string;

  protected errors = ControllerErros;

  constructor(protected service: Service<T>) { }

  public abstract create(
    req: IRequestWithBody<T>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res>;
}
