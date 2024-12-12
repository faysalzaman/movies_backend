import mongoose from "mongoose";

const { Schema } = mongoose;

const videoSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
});

const Video = mongoose.model("Video", videoSchema);

export default Video;
