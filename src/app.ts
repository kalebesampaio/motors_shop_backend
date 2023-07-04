import "express-async-errors";
import express, { Application, json } from "express";

const app: Application = express();
app.use(json());

app.use("/users");
app.use("/login");

export default app;
