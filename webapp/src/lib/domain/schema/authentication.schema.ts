import { z } from 'zod';
export const authenticationSchema = z.object({
	email: z.string().email(),
	password: z.string()
});

export type FormAuthenticationSchema = typeof authenticationSchema;
