import Movie from "../models/movie.js";
import CustomError from "../utils/error.js";
import response from "../utils/response.js";
import { fileExists, deleteFile } from "../utils/file.js";
import Category from "../models/category.js";

export const createMovie = async (req, res, next) => {
  try {
    // Validate file uploads
    if (!req.files || Object.keys(req.files).length === 0) {
      throw new CustomError("No files were uploaded", 400);
    }

    // Validate required fields
    const { name, description, linkType, categoryId } = req.body;
    let link = req.body.link;

    if (!name || !description || !linkType || !categoryId) {
      throw new CustomError("Missing required fields", 400);
    }

    // Validate category
    const category = await Category.findById(categoryId);
    if (!category) {
      throw new CustomError("Category not found", 404);
    }

    // Handle thumbnail
    if (!req.files.thumbnail) {
      throw new CustomError("Thumbnail image is required", 400);
    }
    const image = req.files.thumbnail[0].path;

    // Validate and handle video/link
    if (!["file", "link"].includes(linkType)) {
      throw new CustomError(
        "Invalid link type. It should be file or link",
        400
      );
    }

    if (linkType === "file") {
      if (!req.files.video?.[0]) {
        throw new CustomError("Video file is required", 400);
      }
      link = req.files.video[0].path;
    } else if (!link) {
      throw new CustomError("Video link is required", 400);
    }

    const movie = await Movie.create({
      name,
      description,
      image,
      linkType,
      link,
      category: categoryId,
    });

    res
      .status(201)
      .json(response(201, true, "Movie created successfully", movie));
  } catch (error) {
    // Clean up uploaded files in case of error
    if (req.files) {
      const filesToDelete = ["thumbnail", "video"]
        .filter((field) => req.files[field]?.[0])
        .map((field) => req.files[field][0].path);

      await Promise.all(filesToDelete.map(deleteFile));
    }
    next(error);
  }
};
