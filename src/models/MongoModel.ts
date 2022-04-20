import { Model as M, Document } from 'mongoose';
import { Model } from '../interfaces/ModelInterface';

export default abstract class MongoModel<T> implements Model<T> {
  constructor(protected model: M<T & Document>) { }

  public create = async (obj: T): Promise<T> => this.model.create(obj);

  public read = async (): Promise<T[]> => this.model.find();

  public readOne = async (id: Document['id']): Promise<T | null> =>
    this.model.findById(id);

  public update = async (id: Document['id'], obj: T): Promise<T | null> =>
    this.model.findByIdAndUpdate(id, obj, { new: true });

  public delete = async (id: Document['id']): Promise<T | null> =>
    this.model.findByIdAndDelete(id);
}
