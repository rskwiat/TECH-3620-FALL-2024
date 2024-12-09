import { z } from 'zod';

export const postSchema = z.object({
  title: z.string().min(1, { message: 'Title must be greater than one character' }),
  post: z.string()
    .min(8, { message: 'Post must greater than 8 or more characters long' })
    .max(300, { message: 'Post cannot exceed 300 characters' })
});
