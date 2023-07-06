import { Request, Response } from "express";
import { userServices } from "../services";
import { UserRead, UserReturn } from "../interfaces";

const create = async (req: Request, res: Response): Promise<Response> => {
  const user: UserReturn = await userServices.create(req.body);
  return res.status(201).json(user);
};

const read = async (req: Request, res: Response): Promise<Response> => {
  const admin: boolean = res.locals.decoded.admin;
  const users: UserRead = await userServices.read(admin);

  return res.status(200).json(users);
};

const retrive = async (req: Request, res: Response): Promise<Response> => {
  const id: number = Number(req.params.id);
  const user: UserReturn = await userServices.retrive(id);
  return res.status(200).json(user);
};

const update = async (req: Request, res: Response): Promise<Response> => {
  const id: number = Number(req.params.id);
  const user: UserReturn = await userServices.update(id, req.body);

  return res.status(200).json(user);
};

const destroy = async (req: Request, res: Response): Promise<Response> => {
  await userServices.destroy(res.locals.foundEntity);
  return res.status(204).json();
};

export default { create, read, destroy, update, retrive };
