import { z } from "zod";
import { userSchema } from "./user.schemas";
import { annoucementSchema } from "./announcement";

const commentSchema = z.object({
  id: z.number().positive(),
  text: z.string().max(200),
  created_at: z.string().or(z.date()),
  user: userSchema,
  annoucement: annoucementSchema,
});

const commentCreateSchema = commentSchema.omit({
  id: true,
  user: true,
  annoucement: true,
});

export { commentSchema, commentCreateSchema };
