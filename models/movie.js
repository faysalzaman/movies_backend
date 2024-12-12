import mongoose from "mongoose";
import { ObjectId } from "bson";

const { Schema } = mongoose;

const movieSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: ObjectId,
    ref: "Category",
    required: true,
  },
  link: {
    type: String,
    required: true,
  },

  linkType: {
    type: String,
    enum: ["file", "link"],
    required: true,
  },
});

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
