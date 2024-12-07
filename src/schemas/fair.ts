import { z } from 'zod';

export const fairSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  venue_id: z.number().optional(),
  venue_city_id: z.number().optional(),
  organiser_id: z.number(),
  website: z.string().url().optional(),
  access_type: z.enum(['b2b', 'b2c']),
  dogs_allowed: z.boolean().default(false),
  handicapped_accessible: z.boolean().default(false),
  visitors_count: z.number().optional(),
  exhibitors_count: z.number().optional(),
  exhibition_area: z.number().optional(),
});

export type Fair = z.infer<typeof fairSchema>;