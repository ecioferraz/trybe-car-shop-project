import { ZodError } from 'zod';
import { Model } from '../interfaces/ModelInterface';
import { IVehicle } from '../interfaces/VehicleInterface';

export interface IServiceError {
  error: ZodError,
}

export default abstract class Service<T> {
  constructor(protected model: Model<T>) { }

  public create = async (obj: T): Promise<T | null | IServiceError> =>
    this.model.create(obj);

  public read = async (): Promise<T[]> => this.model.read();

  public readOne = async (id: IVehicle['id']):
  Promise<T | null | IServiceError> =>
    this.model.readOne(id);

  public update = async (
    id: string,
    obj: T,
  ): Promise<T | null | IServiceError> => this.model.update(id, obj);

  public delete = async (id: IVehicle['id']):
  Promise<T | null | IServiceError> =>
    this.model.delete(id);
}
