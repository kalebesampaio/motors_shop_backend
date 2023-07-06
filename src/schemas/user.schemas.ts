import { z } from "zod";
import { addressCreateSchema } from "./address.schemas";

const userSchema = z.object({
  id: z.number().positive(),
  name: z.string().max(150),
  abbreviation: z.string().max(2),
  email: z.string().max(150).email(),
  cpf: z.string().max(11),
  phone: z.string().max(50),
  birthday: z.string(),
  descripition: z.string(),
  password: z.string().max(150),
  seller: z.boolean(),
  resetCode: z.string().max(8).nullable(),
  admin: z.boolean().default(false),
  address: addressCreateSchema,
  createdAt: z.string().or(z.date()),
  updatedAt: z.string().or(z.date()),
  deletedAt: z.string().or(z.date()).nullable(),
});

const userCreateSchema = userSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
  abbreviation: true,
  resetCode: true,
});
const userCreateSchema2 = userSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
  resetCode: true,
});

const userReturnSchema = userSchema.omit({ password: true, resetCode: true });
const userReadSchema = userReturnSchema.array();

const userUpdateSchema = userCreateSchema.omit({ admin: true }).partial();
const userAnnouncerReadSchema = userReturnSchema.omit({
  password: true,
  address: true,
});
export {
  userSchema,
  userCreateSchema,
  userUpdateSchema,
  userReturnSchema,
  userReadSchema,
  userCreateSchema2,
  userAnnouncerReadSchema,
};
