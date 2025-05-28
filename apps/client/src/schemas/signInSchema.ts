import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string().min(3),
  password: z.string().min(10),
});
