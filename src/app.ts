import "express-async-errors";
import express, { Application, json } from "express";
import middlewares from "./middlewares";
import {
  annoucementRouter,
  commentRouter,
  sessionRouter,
  userRouter,
} from "./routers";

const app: Application = express();
app.use(json());

app.use("/users", userRouter);
app.use("/login", sessionRouter);
app.use("/announcements", annoucementRouter);
app.use("/announcements", commentRouter);

app.use(middlewares.handleError);

export default app;
