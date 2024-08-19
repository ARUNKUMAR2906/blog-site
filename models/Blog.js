import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    coverImage: {
      type: String,
      required: false,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const blogModel = new mongoose.model("Blog", blogSchema);

export default blogModel;
