import { z } from 'zod';

export const citySchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, 'Name is required'),
  region: z.string().min(1, 'Region is required'),
  isocode: z.string().min(1, 'ISO code is required'),
  hotel_de_location: z.number().optional(),
  topcity: z.boolean().default(false),
});

export type City = z.infer<typeof citySchema>;