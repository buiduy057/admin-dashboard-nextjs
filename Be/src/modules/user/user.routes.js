import { Router } from "express";

import auth from "../../middlewares/auth.middleware.js";
import { checkRole } from "../../middlewares/role.middleware.js";
import { audit } from "../../middlewares/audit.middleware.js";

import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "./user.controller.js";

const router = Router();
router.get("/", auth, checkRole(["ADMIN"]), getUsers);
router.post(
  "/",
  auth,
  checkRole(["ADMIN"]),
  audit("CREATE", "USER"),
  createUser
);


router.patch(
  '/:id',
  auth,
  checkRole(['ADMIN']),
  audit('UPDATE', 'USER'),
  updateUser
);

router.delete(
  '/:id',
  auth,
  checkRole(['ADMIN']),
  audit('DELETE', 'USER'),
  deleteUser
);

export default router;