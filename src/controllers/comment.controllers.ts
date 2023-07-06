import { Request, Response } from "express";
import { CommentCreate, CommentReturn } from "../interfaces";
import { commentServices } from "../services";

const create = async (req: Request, res: Response): Promise<Response> => {
  const userId: number = Number(res.locals.decoded.sub);
  const id: number = Number(req.params.id);
  const text: CommentCreate = req.body;
  const comment = await commentServices.create(userId, text, id);

  return res.status(201).json(comment);
};

const update = async (req: Request, res: Response): Promise<Response> => {
  const id: number = Number(req.params.id);
  const comment: CommentReturn = await commentServices.update(id, req.body);

  return res.status(200).json(comment);
};

const destroy = async (req: Request, res: Response): Promise<Response> => {
  const id: number = Number(req.params.id);
  await commentServices.destroy(id);
  return res.status(204).json();
};

export default { create, update, destroy };
