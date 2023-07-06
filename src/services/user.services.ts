import { UserCreate2, UserRead, UserReturn, UserUpdate } from "../interfaces";
import { User } from "../entities";
import { userRepository, addressRepository } from "../repositories";
import { userReadSchema, userReturnSchema } from "../schemas";

const create = async (payload: UserCreate2): Promise<UserReturn> => {
  const createdAddress = addressRepository.create({
    ...payload.address,
  });
  await addressRepository.save(createdAddress);

  let abbreviationString = "";

  if (payload.name) {
    if (payload.name.split(" ").length > 1) {
      const arr = payload.name.split(" ");
      abbreviationString = arr[0][0] + arr[1][0];
      payload.abbreviation = abbreviationString;
    } else {
      abbreviationString = payload.name[0];
      payload.abbreviation = abbreviationString;
    }
  }
  const user: User = userRepository.create({
    ...payload,
    address: createdAddress,
  });
  await userRepository.save(user);

  return userReturnSchema.parse(user);
};

const read = async (admin: boolean): Promise<UserRead> => {
  if (admin) {
    const users: Array<User> = await userRepository.find({ withDeleted: true });
    return userReadSchema.parse(users);
  }
  return userReadSchema.parse(
    await userRepository.find({ relations: { address: true } })
  );
};

const retrive = async (id: number): Promise<UserReturn> => {
  return userReturnSchema.parse(
    await userRepository.findOne({
      where: { id },
      relations: { address: true },
    })
  );
};

const update = async (
  id: number,
  userData: UserUpdate
): Promise<UserReturn> => {
  let abbreviationString = "";

  if (userData.name) {
    if (userData.name.split(" ").length > 1) {
      const arr = userData.name.split(" ");
      abbreviationString = arr[0][0] + arr[1][0];
      userData.abbreviation = abbreviationString;
    } else {
      abbreviationString = userData.name[0];
      userData.abbreviation = abbreviationString;
    }
  }
  await userRepository.update(id, { ...userData });
  return userReturnSchema.parse(
    await userRepository.findOne({
      where: { id },
      relations: { address: true },
    })
  );
};

const destroy = async (user: User): Promise<void> => {
  await userRepository.softRemove(user);
};

export default { create, read, destroy, update, retrive };
