import { z } from "zod";

const addressSchema = z.object({
  id: z.number().positive(),
  cep: z.string().max(8),
  state: z.string().max(64),
  city: z.string().max(64),
  number: z.string().max(12),
  complement: z.string().max(200),
});

const addressCreateSchema = addressSchema.omit({ id: true });

const addressUpdateSchema = addressSchema.partial();

export { addressSchema, addressUpdateSchema, addressCreateSchema };
