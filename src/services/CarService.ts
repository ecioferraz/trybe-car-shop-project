import { Car, CarSchema } from '../interfaces/CarInterface';
import Service, { IServiceError } from '.';
import CarModel from '../models/CarModel';

export default class CarService extends Service<Car> {
  constructor(public model = new CarModel()) {
    super(model);
  }

  public create = async (car: Car): Promise<Car | null | IServiceError> => {
    const parsed = CarSchema.safeParse(car);

    if (!parsed.success) return { error: parsed.error };

    return this.model.create(car);
  };
}
