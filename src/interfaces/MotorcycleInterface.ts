import { z } from 'zod';
import { VehicleSchema } from './VehicleInterface';

const MotorcycleSchema = z.object({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number().int().lte(2500),
}).merge(VehicleSchema);

type Motorcycle = z.infer<typeof MotorcycleSchema>;

export {
  Motorcycle,
  MotorcycleSchema,
};
