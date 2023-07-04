import { handleError } from "./handleError.middleware";
import { idExists } from "./idExists.middleware";
import { isAdmin } from "./isAdmin.middleware";
import { isAdminOrOwner } from "./isAdminOrOwner.middleware";
import { uniqueEmail } from "./uniqueEmail.middleware";
import { validateBody } from "./validateBody.middleware";
import { verifyToken } from "./verifyToken.middleware";
import { uniqueCpf } from "./uniqueCpf.middleware";

export default {
  handleError,
  idExists,
  validateBody,
  uniqueEmail,
  verifyToken,
  isAdmin,
  isAdminOrOwner,
  uniqueCpf,
};
