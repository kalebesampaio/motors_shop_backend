import { NextFunction, Request, Response } from "express";
import { User } from "../entities";
import { userRepository } from "../repositories";
import { AppError } from "../errors";

export const uniqueCpf = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const cpf: string = req.body.cpf;
  if (!cpf) return next();

  const foundEntity: User | null = await userRepository.findOneBy({ cpf });
  if (foundEntity) throw new AppError("Cpf already exists", 409);

  return next();
};
