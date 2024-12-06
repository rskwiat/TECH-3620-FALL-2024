import { z } from 'zod';

export const LoginUserSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string()
    .min(8, { message: 'Must be 8 or more characters long' })
    .max(20, { message: 'Password cannot be greater than 20 characters' })
});
