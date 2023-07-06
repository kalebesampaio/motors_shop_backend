import { Router } from "express";
import middlewares from "../middlewares";
import { annoucementCreateSchema } from "../schemas";
import { announcementControllers } from "../controllers";

export const annoucementRouter: Router = Router();

annoucementRouter.post(
  "",
  middlewares.verifyToken,
  middlewares.validateBody(annoucementCreateSchema),
  announcementControllers.create
);
annoucementRouter.get("", announcementControllers.read);

annoucementRouter.use("/:id", middlewares.verifyToken);
annoucementRouter.get("/:id", announcementControllers.retrive);
annoucementRouter.patch(
  "/:id",
  middlewares.verifyToken,
  middlewares.isOwner,
  announcementControllers.update
);
annoucementRouter.delete(
  "/:id",
  middlewares.verifyToken,
  middlewares.isOwner,
  announcementControllers.destroy
);
