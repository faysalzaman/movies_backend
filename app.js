import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import path from "path";
import swaggerUi from "swagger-ui-express";

import { MulterError } from "multer";
import swaggerSpec from "./config/swagger.js";
import categoryRoutes from "./routes/category.js";
import movieRoutes from "./routes/movie.js";
import videoRoutes from "./routes/video.js";
import MyError from "./utils/error.js";
import response from "./utils/response.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// If you want to change the default uploads directory, you can do so here
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

// Add your routes...
app.use("/api/v1/video", videoRoutes);
app.use("/api/v1/movie", movieRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((req, res, next) => {
  const error = new MyError(`No route found for ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
});

app.use((error, req, res, next) => {
  console.log(error);
  let status = 500;
  let message =
    "An error occurred while processing your request. Please try again later.";
  let data = null;
  let success = false;

  if (error instanceof MyError || error instanceof MulterError) {
    status = error.statusCode || 500;
    message = error.message || message;
    data = error.data || null;
  }

  res.status(status).json(response(status, success, message, data));
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, function () {
      console.log(`DB connected & Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
