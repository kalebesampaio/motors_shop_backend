import { Request, Response } from "express";
import { announcementServices } from "../services";
import { AnnoucementReturn } from "../interfaces";

const create = async (req: Request, res: Response): Promise<Response> => {
  const userId: number = Number(res.locals.decoded.sub);
  const announcement: AnnoucementReturn = await announcementServices.create(
    req.body,
    userId
  );

  return res.status(201).json(announcement);
};

const read = async (req: Request, res: Response): Promise<Response> => {
  const announcements = await announcementServices.read();
  return res.status(200).json(announcements);
};

const retrive = async (req: Request, res: Response): Promise<Response> => {
  const id: number = Number(req.params.id);
  const announcement = await announcementServices.retrive(id);

  return res.status(200).json(announcement);
};

const update = async (req: Request, res: Response): Promise<Response> => {
  const id: number = Number(req.params.id);
  const announcement: AnnoucementReturn = await announcementServices.update(
    id,
    req.body
  );

  return res.status(200).json(announcement);
};

const destroy = async (req: Request, res: Response): Promise<Response> => {
  const id: number = Number(req.params.id);
  await announcementServices.destroy(id);
  return res.status(204).json();
};
export default { create, read, retrive, update, destroy };
