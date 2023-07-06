import { Router } from "express";
import middlewares from "../middlewares";
import { commentCreateSchema } from "../schemas";
import { commentControllers } from "../controllers";

export const commentRouter: Router = Router();

commentRouter.post(
  "/:id/comments",
  middlewares.verifyToken,
  middlewares.validateBody(commentCreateSchema),
  commentControllers.create
);
commentRouter.patch(
  "/comments/:id",
  middlewares.verifyToken,
  middlewares.commentOwner,
  commentControllers.update
);
commentRouter.delete(
  "/comments/:id",
  middlewares.verifyToken,
  middlewares.commentOwner,
  commentControllers.destroy
);
