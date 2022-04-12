import {
  Motorcycle,
  MotorcycleSchema,
} from '../interfaces/MotorcycleInterface';
import Service, { IServiceError } from '.';
import MotorcycleModel from '../models/MotorcycleModel';

export default class MotorcycleService extends Service<Motorcycle> {
  constructor(public model = new MotorcycleModel()) {
    super(model);
  }

  public create = async (motorcycle: Motorcycle):
  Promise<Motorcycle | null | IServiceError> => {
    const parsed = MotorcycleSchema.safeParse(motorcycle);

    if (!parsed.success) return { error: parsed.error };

    return this.model.create(motorcycle);
  };
}
