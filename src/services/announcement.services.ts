import {
  AnnoucementCreate,
  AnnoucementRead,
  AnnoucementReturn,
  AnnoucementUpdate,
} from "../interfaces";
import { Announcement, User } from "../entities";
import { userRepository, announcementRepository } from "../repositories";
import {
  annoucementReadSchema,
  annoucementReturn2Schema,
  annoucementReturnSchema,
} from "../schemas";

const create = async (
  payload: AnnoucementCreate,
  userId: number
): Promise<AnnoucementReturn> => {
  const user: User = (await userRepository.findOne({
    where: { id: userId },
    relations: { address: true },
  }))!;

  const announcement: Announcement = announcementRepository.create({
    ...payload,
    user,
    comments: [],
  });

  await announcementRepository.save(announcement);

  return annoucementReturnSchema.parse(announcement);
};

const read = async (): Promise<AnnoucementRead> => {
  const announcements = annoucementReadSchema.parse(
    await announcementRepository.find({
      relations: {
        user: true,
        comments: true,
      },
    })
  );

  return announcements;
};

const retrive = async (id: number): Promise<AnnoucementReturn> => {
  return annoucementReturn2Schema.parse(
    await announcementRepository.findOne({
      where: { id },
      relations: { user: true, comments: true },
    })
  );
};

const update = async (
  id: number,
  announcerData: AnnoucementUpdate
): Promise<AnnoucementReturn> => {
  await announcementRepository.update(id, { ...announcerData });
  return annoucementReturn2Schema.parse(
    await announcementRepository.findOne({
      where: { id },
      relations: { comments: true, user: true },
    })
  );
};
const destroy = async (id: Number): Promise<void> => {
  const announcements = await announcementRepository.find();
  const announcer = announcements.find((a) => a.id === id);

  await announcementRepository.delete(announcer!.id);
};

export default { create, read, retrive, update, destroy };
