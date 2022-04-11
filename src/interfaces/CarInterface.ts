import { z } from 'zod';
import { VehicleSchema } from './VehicleInterface';

const CarSchema = z.object({
  doorsQty: z.number({
    required_error: 'doorsQty is required',
    invalid_type_error: 'dorrsQty must be a number',
  }).min(2, { message: 'Must be 2 or higher' })
    .max(4, { message: 'Must be 4 or lower' }),
  seatsQty: z.number({
    required_error: 'doorsQty is required',
    invalid_type_error: 'dorrsQty must be a number',
  }).min(2, { message: 'Must be 2 or higher' })
    .max(7, { message: 'Must be 7 or lower' }),
}).merge(VehicleSchema);

type Car = z.infer<typeof CarSchema>;

export {
  Car,
  CarSchema,
};
