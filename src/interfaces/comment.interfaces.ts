import { z } from "zod";
import { Repository } from "typeorm";
import { Comment } from "../entities";
import { commentCreateSchema } from "../schemas";

type CommentCreate = z.infer<typeof commentCreateSchema>;

type CommentRepo = Repository<Comment>;

export { CommentCreate, CommentRepo };
