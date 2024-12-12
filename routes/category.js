import express from "express";

import { uploadSingle } from "multermate-es";

import {
  createCategory,
  getAllCategories,
  deleteCategory,
  updateCategory,
  getCategoryById,
} from "../controller/category.js";

const router = express.Router();

router.post(
  "/create",
  uploadSingle({
    destination: "uploads",
    fileTypes: ["images"],
    fileSizeLimit: 1024 * 1024 * 5, // 5MB limit
    filename: "image",
  }),
  createCategory
);
router.get("/all", getAllCategories);
router.delete("/delete/:id", deleteCategory);
router.put(
  "/update/:id",
  uploadSingle({
    destination: "uploads/",
    fileTypes: ["images"],
    fileSizeLimit: 1024 * 1024 * 5, // 5MB limit
    filename: "image",
  }),
  updateCategory
);
router.get("/:id", getCategoryById);

export default router;
