import { z } from "zod";
import { addressSchema } from "./address.schemas";

const userSchema = z.object({
  id: z.number().positive(),
  name: z.string().max(150),
  abbreviation: z.string().max(2),
  email: z.string().max(100).email(),
  cpf: z.string().max(11),
  phone: z.string().max(50),
  birthday: z.string().or(z.date()),
  descripition: z.string().max(200),
  password: z.string().max(150),
  seller: z.boolean(),
  resetCode: z.string().max(8),
  admin: z.boolean().default(false),
  address: addressSchema,
  createdAt: z.string().or(z.date()),
  updatedAt: z.string().or(z.date()),
  deletedAt: z.string().or(z.date()).nullable(),
});

const userCreateSchema = userSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

const userReturnSchema = userSchema.omit({ password: true });
const userReadSchema = userReturnSchema.array();

const userUpdateSchema = userCreateSchema.omit({ admin: true }).partial();

export {
  userSchema,
  userCreateSchema,
  userUpdateSchema,
  userReturnSchema,
  userReadSchema,
};
