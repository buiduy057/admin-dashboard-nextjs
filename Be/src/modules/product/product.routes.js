import { Router } from "express";

import auth from "../../middlewares/auth.middleware.js";
import { checkRole } from "../../middlewares/role.middleware.js";
import { audit } from "../../middlewares/audit.middleware.js";
import upload from "../../utils/uploadCloudinary.js";
import {
  getProducts,
  getProductDetail,
  createProduct,
  updateProduct,
  uploadProductImages,
  deleteImages,
  deleteProduct,
} from "./product.controller.js";

const router = Router();
router.get("/", auth, checkRole(["ADMIN"]), getProducts);

router.get("/:id", auth, checkRole(["ADMIN"]), getProductDetail);
router.post(
  "/",
  auth,
  checkRole(["ADMIN"]),
  audit("CREATE", "PRODUCT"),
  createProduct
);

router.put(
  "/:id",
  auth,
  checkRole(["ADMIN"]),
  audit("UPDATE", "PRODUCT"),
  updateProduct
);

router.post(
  "/:id/images",
  auth,
  checkRole(["ADMIN"]),
  upload.any(),
  uploadProductImages
);

router.post("/images", auth, checkRole(["ADMIN"]), deleteImages);

router.delete(
  "/:id",
  auth,
  checkRole(["ADMIN"]),
  audit("DELETE", "PRODUCT"),
  deleteProduct
);

export default router;
