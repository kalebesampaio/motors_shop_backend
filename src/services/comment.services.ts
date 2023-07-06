import { Announcement, Comment, User } from "../entities";
import { CommentCreate, CommentReturn, CommentUpdate } from "../interfaces";
import {
  announcementRepository,
  commentRepository,
  userRepository,
} from "../repositories";
import { commentSchema } from "../schemas";

const create = async (
  userId: number,
  { text }: CommentCreate,
  id: number
): Promise<Comment> => {
  const user: User = (await userRepository.findOneBy({ id: userId }))!;
  const annoucer: Announcement = (await announcementRepository.findOneBy({
    id,
  }))!;
  const comment: Comment = commentRepository.create({
    text,
    user,
    annoucement: annoucer,
  });
  await commentRepository.save(comment);

  return comment;
};

const update = async (
  id: number,
  commentData: CommentUpdate
): Promise<CommentReturn> => {
  await commentRepository.update(id, { ...commentData });
  return commentSchema.parse(
    await commentRepository.findOne({
      where: { id },
      relations: { user: true },
    })
  );
};

const destroy = async (id: Number): Promise<void> => {
  const comments = await commentRepository.find();
  const comment = comments.find((c) => c.id === id);

  await commentRepository.delete(comment!.id);
};

export default { create, update, destroy };
