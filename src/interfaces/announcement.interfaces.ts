import { z } from "zod";
import { DeepPartial, Repository } from "typeorm";
import { annoucementCreateSchema, annoucementReturn2Schema } from "../schemas";
import { Announcement } from "../entities";
type AnnoucementCreate = z.infer<typeof annoucementCreateSchema>;
type AnnoucementReturn = z.infer<typeof annoucementReturn2Schema>;
type AnnoucementRead = Array<AnnoucementReturn>;
type AnnoucementUpdate = DeepPartial<Announcement>;

type AnnoucementRepo = Repository<Announcement>;

export {
  AnnoucementCreate,
  AnnoucementReturn,
  AnnoucementRepo,
  AnnoucementRead,
  AnnoucementUpdate,
};
