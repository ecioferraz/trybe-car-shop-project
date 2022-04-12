import { Schema, model as createModel, Document } from 'mongoose';
import { Motorcycle } from '../interfaces/MotorcycleInterface';
import MongoModel from './MongoModel';

interface IMotorcycleDocument extends Motorcycle, Document { }

const motorcycleSchema = new Schema<IMotorcycleDocument>({
  category: Array,
  engineCapacity: Number,
}, { versionKey: false });

export default class MotorcycleModel extends MongoModel<Motorcycle> {
  constructor(public model = createModel('Motorcycles', motorcycleSchema)) {
    super(model);
  }
}
