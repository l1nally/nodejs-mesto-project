import { z } from 'zod';
import { urlRegex, idRegex } from '../utils/constants';

export const createUserSchema = z.object({
  name: z.string().min(2).max(30).optional(),
  about: z.string().min(2).max(30).optional(),
  avatar: z
    .string()
    .optional()
    .refine((url) => url === undefined || urlRegex.test(url)),
  email: z.string().email(),
  password: z.string(),
});

export const updateInfoUserSchema = z.object({
  name: z.string().min(1, 'Имя не может быть пустым').optional(),
  about: z.string().min(1, 'Описание не может быть пустым').optional(),
});

export const updateAvatarUserSchema = z.object({
  avatar: z.string().regex(urlRegex),
});

export const userIdParamSchema = z.object({
  userId: z.string().min(24).max(24).regex(idRegex),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
