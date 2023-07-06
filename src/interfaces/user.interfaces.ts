import { z } from "zod";
import {
  userCreateSchema,
  userCreateSchema2,
  userReadSchema,
  userReturnSchema,
} from "../schemas";
import { DeepPartial, Repository } from "typeorm";
import { User } from "../entities";

type UserCreate = z.infer<typeof userCreateSchema>;
type UserCreate2 = z.infer<typeof userCreateSchema2>;
type UserRead = z.infer<typeof userReadSchema>;
type UserReturn = z.infer<typeof userReturnSchema>;
type UserUpdate = DeepPartial<User>;

type UserRepo = Repository<User>;

export { UserCreate, UserRead, UserReturn, UserUpdate, UserRepo, UserCreate2 };
