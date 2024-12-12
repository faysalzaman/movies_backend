import Category from "../models/category.js";
import CustomError from "../utils/error.js";
import response from "../utils/response.js";
import { fileExists, deleteFile } from "../utils/file.js";

export const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const image = req.file;

    // check if image is provided
    if (!image) {
      throw new CustomError("Image is required", 400);
    }

    // check if category already exists
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      throw new CustomError("Category already exists", 400);
    }

    const category = await Category.create({ name, image: image.path });
    res.status(201).json(response(201, true, "Category added", category));
  } catch (error) {
    // delete the image from the server if any error occurs
    if (req.file && (await fileExists(req.file.path))) {
      await deleteFile(req.file.path);
    }
    next(error);
  }
};

export const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();

    if (!categories) {
      throw new CustomError("No categories found", 404);
    }

    res.status(200).json(response(200, true, "Categories fetched", categories));
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    // First fetch the category
    const category = await Category.findById(id);

    if (!category) {
      throw new CustomError("Category not found", 404);
    }

    if (await fileExists(category.image)) {
      await deleteFile(category.image);
    }

    // Then delete the category
    await Category.findByIdAndDelete(id);

    res.status(200).json(response(200, true, "Category deleted"));
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  let oldImage;
  try {
    const { id } = req.params;
    const { name } = req.body;
    const image = req.file;

    // First fetch the existing category
    const existingCategory = await Category.findById(id);
    if (!existingCategory) {
      throw new CustomError("Category not found", 404);
    }

    if (name) existingCategory.name = name;
    if (image) {
      if (await fileExists(existingCategory.image)) {
        await deleteFile(existingCategory.image);
      }
      existingCategory.image = image.path;
    }

    await existingCategory.save();

    res
      .status(200)
      .json(response(200, true, "Category updated", existingCategory));
  } catch (error) {
    if (req.file && (await fileExists(req.file.path))) {
      await deleteFile(req.file.path);
    }
    next(error);
  }
};

export const getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category) {
      throw new CustomError(
        "The category you are looking for does not exist",
        404
      );
    }

    res.status(200).json(response(200, true, "Category fetched", category));
  } catch (error) {
    next(error);
  }
};
