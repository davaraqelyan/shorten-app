// This file is deprecated. Use schemas from ../schemas.ts instead.
// Re-export for backwards compatibility
export { 
  loginSchema, 
  registerSchema, 
  type LoginFormData, 
  type RegisterFormData 
} from '../schemas';

import { z } from 'zod';
import { registerSchema as baseRegisterSchema } from '../schemas';

// Extended register schema with confirmPassword for form validation
export const registerWithConfirmPasswordSchema = baseRegisterSchema.extend({
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export type RegisterWithConfirmPasswordFormData = z.infer<typeof registerWithConfirmPasswordSchema>;