import { Router } from "express";

import auth from "../../middlewares/auth.middleware.js";
import { checkRole } from "../../middlewares/role.middleware.js";
import { audit } from "../../middlewares/audit.middleware.js";

import {
  getCategories,
  createCategories,
  updateCategories,
  deleteCategories,
} from "./category.controller.js";

const router = Router();
router.get("/", auth, checkRole(["ADMIN"]), getCategories);
router.post(
  "/",
  auth,
  checkRole(["ADMIN"]),
  audit("CREATE", "CATEGORY"),
  createCategories
);

router.put(
  "/:id",
  auth,
  checkRole(["ADMIN"]),
  audit("UPDATE", "CATEGORY"),
  updateCategories
);

router.delete(
  "/:id",
  auth,
  checkRole(["ADMIN"]),
  audit("DELETE", "CATEGORY"),
  deleteCategories
);

export default router;
