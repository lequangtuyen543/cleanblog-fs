import { Request, Response } from "express";
import Post from "../models/post.model";

// [GET] /api/v1/posts
export const index = async (req: Request, res: Response) => {
  const posts = await Post.find();
  
  res.json(posts);
};

// [GET] /api/v1/posts/:id
export const detail = async (req: Request, res: Response) => {
  const id = req.params.id;
  const post = await Post.findOne({ _id: id });
  
  res.json(post);
};
