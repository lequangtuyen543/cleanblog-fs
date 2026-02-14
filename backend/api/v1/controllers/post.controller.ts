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

// [POST] /api/v1/posts/create
export const create = async (req: Request, res: Response) => {
  try {
    req.body.createdAt = new Date();
    req.body.updatedAt = new Date();
    req.body.createdBy = res.locals.user.fullName;

    const record = new Post(req.body);
    const data = await record.save();

    res.json({
      code: 200,
      message: "Tạo thành công!",
      data: data
    });

  } catch (error) {
    res.json({
      code: 400,
      message: "Lỗi!",
    });
  }
};

// [PATCH] /api/v1/posts/edit/:id
export const edit = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    console.log(req.body);

    await Post.updateOne({ _id: id }, req.body);

    res.json({
      code: 200,
      message: "Cập nhật thành công!",
    });

  } catch (error) {
    res.json({
      code: 400,
      message: "Lỗi!",
    });
  }
}


