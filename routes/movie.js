import express from "express";
import { uploadMultiple } from "multermate-es";

import { createMovie } from "../controller/movie.js";

const router = express.Router();

const upload = uploadMultiple({
  fields: [
    {
      name: "thumbnail",
      maxCount: 1,
      fileTypes: ["images"],
    },
    {
      name: "video",
      maxCount: 1,
      fileTypes: ["videos"],
    },
  ],
  destination: "uploads",
});

router.post("/create", upload, createMovie);

export default router;
