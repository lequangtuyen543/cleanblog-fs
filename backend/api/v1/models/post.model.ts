import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: String,
    subtitle: String,
    createdBy: String,
    createdAt: Date,
    status: {
      default: "active",
      type: String,
    },
    content: String,
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  {
    timestamps: true,
  },
);

const Post = mongoose.model("Post", postSchema, "posts");

export default Post;
