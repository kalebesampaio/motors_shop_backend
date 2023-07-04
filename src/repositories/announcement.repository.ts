import { AppDataSource } from "../data-source";
import { Announcement } from "../entities";

export default AppDataSource.getRepository(Announcement);
