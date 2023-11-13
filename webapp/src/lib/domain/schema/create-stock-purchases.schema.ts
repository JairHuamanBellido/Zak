import { z } from 'zod';

export const createStockPurchasesSchema = z.object({
	date: z.coerce.date(),
	symbol: z.string().min(1),
	quantity: z.coerce.number(),
	price: z.coerce.number(),
	currency: z.string().min(1)
});

export type FormCreateStockPurchasesSchema = typeof createStockPurchasesSchema;
