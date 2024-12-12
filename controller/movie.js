import Category from "../models/category.js";
import Movie from "../models/movie.js";
import { movieSchema } from "../schemas/movie.schema.js";
import CustomError from "../utils/error.js";
import { deleteFile } from "../utils/file.js";
import response from "../utils/response.js";

export const createMovie = async (req, res, next) => {
  try {
    const { error, value } = movieSchema.validate(req.body);

    if (error) {
      throw new CustomError(error.details[0].message, 400);
    }

    // Validate file uploads
    if (!req.files || Object.keys(req.files).length === 0) {
      throw new CustomError("No files were uploaded", 400);
    }

    // Validate required fields
    const { name, description, linkType, categoryId } = value;
    let link = value.link;

    // Validate category
    const category = await Category.findById(categoryId);
    if (!category) {
      throw new CustomError("Category not found", 404);
    }

    // Handle thumbnail
    if (req.files.thumbnail) {
      value.image = req.files.thumbnail[0].path;
    }

    if (linkType === "file") {
      if (!req.files.movie?.[0]) {
        throw new CustomError("movie file is required", 400);
      }
      link = req.files.movie[0].path;
    } else if (linkType === "link") {
      link = value.link;
    }

    const movie = await Movie.create({
      name,
      description,
      image: value.image,
      linkType,
      link,
      category: categoryId,
    });

    res
      .status(201)
      .json(response(201, true, "Movie created successfully", movie));
  } catch (error) {
    if (req.files) {
      const filesToDelete = ["thumbnail", "movie"]
        .filter((field) => req.files[field]?.[0])
        .map((field) => req.files[field][0].path);

      await Promise.all(filesToDelete.map(deleteFile));
    }
    next(error);
  }
};
