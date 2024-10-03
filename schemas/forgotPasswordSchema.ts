import { z } from 'zod';

export const ForgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export type ForgotPasswordType = z.infer<typeof ForgotPasswordSchema>;