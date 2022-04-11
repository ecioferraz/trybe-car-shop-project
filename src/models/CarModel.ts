import { Schema, model as createModel, Document } from 'mongoose';
import { Car } from '../interfaces/CarInterface';
import MongoModel from './MongoModel';

interface ICarDocument extends Car, Document { }

const carSchema = new Schema<ICarDocument>({
  model: String,
  year: Number,
  color: String,
  status: Boolean || undefined,
  buyValue: Number,
  doorsQty: Number,
  seatsQty: Number,
});

export default class CarModel extends MongoModel<Car> {
  constructor() {
    super(createModel('CarShop', carSchema));
  }
}
