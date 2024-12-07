import { z } from 'zod';

export const venueSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, 'Name is required'),
  city_id: z.number(),
  contact_info_id: z.number().optional(),
  search_booster: z.string().optional(),
});

export type Venue = z.infer<typeof venueSchema>;