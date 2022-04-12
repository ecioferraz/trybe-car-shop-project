import { Schema, model as createModel, Document } from 'mongoose';
import { Motorcycle } from '../interfaces/MotorcycleInterface';
import MongoModel from './MongoModel';

interface IMotorcycleDocument extends Motorcycle, Document { }

const motorcycleSchema = new Schema<IMotorcycleDocument>({
  model: String,
  year: Number,
  color: String,
  status: Boolean,
  buyValue: Number,
  category: String,
  engineCapacity: Number,
}, { versionKey: false });

export default class MotorcycleModel extends MongoModel<Motorcycle> {
  constructor(public model = createModel('Motorcycles', motorcycleSchema)) {
    super(model);
  }
}
