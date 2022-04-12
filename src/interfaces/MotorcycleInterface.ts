import { z } from 'zod';
import { VehicleSchema } from './VehicleInterface';

const MotorcycleSchema = z.object({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number({
    required_error: 'engineCapacity is required',
    invalid_type_error: 'engineCapacity must be a number',
  }).gt(0, { message: 'engineCapacity must be higher than 0' })
    .lte(2500, { message: 'engineCapacity must be 2500 or lower' })
    .int({ message: 'engineCapacity must be an integer' }),
}).merge(VehicleSchema);

type Motorcycle = z.infer<typeof MotorcycleSchema>;

export {
  Motorcycle,
  MotorcycleSchema,
};
