import { z } from 'zod';
import { VehicleSchema } from './VehicleInterface';

const CarSchema = z.object({
  doorsQty: z.number({
    required_error: 'doorsQty is required',
    invalid_type_error: 'dorrsQty must be a number',
  }).gte(2, { message: 'doorsQty must be 2 or higher' })
    .lte(4, { message: 'doorsQty must be 4 or lower' }),
  seatsQty: z.number({
    required_error: 'doorsQty is required',
    invalid_type_error: 'dorrsQty must be a number',
  }).gte(2, { message: 'doorsQty must be 2 or higher' })
    .lte(7, { message: 'doorsQty must be 7 or lower' }),
}).merge(VehicleSchema);

type Car = z.infer<typeof CarSchema>;

export {
  Car,
  CarSchema,
};
