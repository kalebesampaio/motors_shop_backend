import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import { commentRepository } from "../repositories";

export const commentOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { admin, sub } = res.locals.decoded;
  const { id } = req.params;

  const comments = await commentRepository.find();
  const comment = comments.find((c) => c.id === Number(id));

  if (admin) return next();

  if (comment?.user.id !== Number(sub)) {
    throw new AppError("Insufficient permissions", 403);
  }

  return next();
};
