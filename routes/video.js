import express from "express";
import { uploadSingle } from "multermate-es";

import { createVideo } from "../controller/video.js";

const uploadVideo = uploadSingle({
  destination: "uploads/videos",
  filename: "video",
  fileTypes: ["videos"],
});

const router = express.Router();

router.post("/upload", uploadVideo, createVideo);

export default router;
