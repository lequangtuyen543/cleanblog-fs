import { Request, Response } from "express";
import Post from "../models/post.model";
import searchHelper from "../../../helpers/search";
import paginationHelper from "../../../helpers/pagination";

// [GET] /api/v1/posts
export const index = async (req: Request, res: Response) => {
  try {
    // Find
    interface Find {
      deleted: boolean;
      status?: string;
      title?: RegExp;
    }

    const find: Find = {
      deleted: false,
    };

    if (req.query.status) {
      find.status = req.query.status.toString();
    }
    // End Find

    // Search
    const objectSearch = searchHelper(req.query);

    if (req.query.keyword) {
      find.title = objectSearch.regex;
    }
    // End Search

    // Pagination
    let initPagination = {
      currentPage: 1,
      limitItems: 5, // posts thường nhiều hơn nên để 5 hoặc 10
    };

    const countPosts = await Post.countDocuments(find);

    let objectPagination = paginationHelper(
      initPagination,
      req.query,
      countPosts,
    );
    // End Pagination

    // Sort
    const sort: any = {};

    if (req.query.sortKey && req.query.sortValue) {
      const sortKey = req.query.sortKey.toString();
      sort[sortKey] = req.query.sortValue;
    } else {
      sort.createdAt = "desc"; // mặc định sort mới nhất
    }
    // End Sort

    // Query
    const posts = await Post.find(find)
      .sort(sort)
      .limit(objectPagination.limitItems)
      .skip(objectPagination.skip);

    // Response
    res.json({
      code: 200,
      message: "Success",
      data: posts,
      pagination: objectPagination,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: "Error",
      error: error.message,
    });
  }
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
      data: data,
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
};
// [DELETE] /api/v1/posts/delete/:id
export const deletePost = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    await Post.updateOne(
      { _id: id },
      {
        deleted: true,
        deletedAt: new Date(),
      },
    );

    res.json({
      code: 200,
      message: "Xóa thành công!",
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Lỗi!",
    });
  }
};
