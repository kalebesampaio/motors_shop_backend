import { z } from "zod";
import { userReturnSchema, userSchema } from "./user.schemas";
import { commentCreateSchema } from "./comment.schemas";

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
  user: userSchema,
  comments: z.string(),
});

const annoucementCreateSchema = annoucementSchema
  .omit({
    id: true,
    isActive: true,
    comments: true,
    user: true,
  })
  .extend({
    comments: commentCreateSchema.array(),
  });

const annoucementReturnSchema = annoucementSchema
  .omit({ comments: true })
  .extend({
    user: userReturnSchema,
  });

export { annoucementSchema, annoucementReturnSchema, annoucementCreateSchema };
