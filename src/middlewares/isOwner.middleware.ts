import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import { announcementRepository } from "../repositories";

export const isOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { admin, sub } = res.locals.decoded;
  const { id } = req.params;

  const announcements = await announcementRepository.find();
  const announcer = announcements.find((a) => a.id === Number(id));

  if (admin) return next();

  if (announcer?.user.id !== Number(sub)) {
    throw new AppError("Insufficient permissions", 403);
  }

  return next();
};
