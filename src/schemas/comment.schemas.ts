import { z } from "zod";
import { userAnnouncerReadSchema } from "./user.schemas";

const commentSchema = z.object({
  id: z.number().positive(),
  text: z.string().max(200),
  user: userAnnouncerReadSchema,
});

const commentReadSchema = commentSchema.array();
const commentCreateSchema = z.object({
  text: z.string().max(200),
});

const commentUpdateSchema = commentCreateSchema.partial();

export {
  commentSchema,
  commentCreateSchema,
  commentUpdateSchema,
  commentReadSchema,
};
