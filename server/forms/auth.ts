import { z } from 'zod';

export const userRegistrationForm = z.object({
  username: z.string().min(3).max(32),
  password: z.string().min(6).max(255),
});

export const userLoginForm = z.object({
  username: z.string().min(3).max(32),
  password: z.string().min(6).max(255),
});

export const updateUserForm = z.object({
  data: z.object({
    username: z.string()
      .min(3)
      .max(32)
      .optional(),
  }),
  id: z.string(),
});

export const deleteUserForm = z.object({
  id: z.string(),
});
