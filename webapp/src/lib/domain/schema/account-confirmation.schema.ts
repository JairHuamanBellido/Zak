import { z } from 'zod';

export const accountConfirmationSchema = z.object({
	email: z.string().email(),
	code: z.string()
});

export type FormAccountConfirmationSchema = typeof accountConfirmationSchema;
