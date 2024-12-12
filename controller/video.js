import Video from "../models/video.js";
import MyError from "../utils/error.js";
import response from "../utils/response.js";
import { deleteFile } from "../utils/file.js";

export const createVideo = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) throw new MyError("Name is required", 400);

    if (!req.file) throw new MyError("Video not uploaded", 400);

    const video = await Video.create({ name: name, path: req.file.path });

    res
      .status(201)
      .json(response(201, true, "Video created successfully", video));
  } catch (error) {
    if (req.file) {
      await deleteFile(req.file.path);
    }
    next(error);
  }
};
