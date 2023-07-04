import { z } from "zod";
import { DeepPartial, Repository } from "typeorm";
import { annoucementCreateSchema, annoucementReturnSchema } from "../schemas";
import { Announcement } from "../entities";

type AnnoucementCreate = z.infer<typeof annoucementCreateSchema>;
type AnnoucementReturn = z.infer<typeof annoucementReturnSchema>;
type AnnoucementRead = Array<AnnoucementReturn>;

type AnnoucementRepo = Repository<Announcement>;

export {
  AnnoucementCreate,
  AnnoucementReturn,
  AnnoucementRepo,
  AnnoucementRead,
};
