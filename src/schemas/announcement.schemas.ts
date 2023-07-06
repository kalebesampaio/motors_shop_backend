import { z } from "zod";
import { userAnnouncerReadSchema, userReturnSchema } from "./user.schemas";
import { commentSchema } from "./comment.schemas";

const annoucementSchema = z.object({
  id: z.number().positive(),
  model: z.string().max(60),
  type: z.string().max(150),
  description: z.string(),
  km: z.number().positive(),
  year: z.number().positive(),
  default_img: z.string().max(220),
  price: z.number().positive(),
  isActive: z.boolean().default(true),
  user: userReturnSchema,
  images: z.string().array(),
  comments: commentSchema.array(),
});

const annoucementCreateSchema = annoucementSchema.omit({
  id: true,
  isActive: true,
  comments: true,
  user: true,
});

const annoucementReturnSchema = annoucementSchema.extend({
  user: userReturnSchema,
});

const annoucementReturn2Schema = annoucementSchema.extend({
  user: userAnnouncerReadSchema,
});
const annoucementReadSchema = annoucementReturn2Schema.array();

const annoucementUpdateSchema = annoucementCreateSchema.partial();

export {
  annoucementSchema,
  annoucementReturnSchema,
  annoucementCreateSchema,
  annoucementReadSchema,
  annoucementReturn2Schema,
  annoucementUpdateSchema,
};
