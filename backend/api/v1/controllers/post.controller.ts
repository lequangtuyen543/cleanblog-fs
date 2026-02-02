import { Request, Response } from "express";
import Post from "../models/post.model";

// [GET] /api/v1/posts
export const index = async (req: Request, res: Response) => {
  const posts = await Post.find();
  
  res.json(posts);
};
