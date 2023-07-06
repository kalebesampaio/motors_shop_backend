import { Router } from "express";
import middlewares from "../middlewares";
import { userCreateSchema } from "../schemas";
import { userControllers } from "../controllers";

export const userRouter: Router = Router();

userRouter.post(
  "",
  middlewares.validateBody(userCreateSchema),
  middlewares.uniqueEmail,
  middlewares.uniqueCpf,
  userControllers.create
);
userRouter.get("", middlewares.verifyToken, userControllers.read);

userRouter.use("/:id", middlewares.idExists, middlewares.verifyToken);
userRouter.get("/:id", userControllers.retrive);
userRouter.patch(
  "/:id",
  middlewares.uniqueEmail,
  middlewares.uniqueCpf,
  userControllers.update
);
userRouter.delete("/:id", middlewares.isAdminOrOwner, userControllers.destroy);
