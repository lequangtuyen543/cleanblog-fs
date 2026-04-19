import { Request, Response } from "express";
import mongoose from "mongoose";
import Post from "../models/post.model";
import Category from "../models/category.model";
import searchHelper from "../../../helpers/search";
import paginationHelper from "../../../helpers/pagination";

type LocalUser = {
  _id: mongoose.Types.ObjectId;
  role?: { title?: string; permissions?: string[] } | null;
};

const isAdmin = (user: LocalUser): boolean => {
  const title = user.role?.title?.toLowerCase();
  if (title === "admin") return true;
  const perms = user.role?.permissions ?? [];
  return perms.some((p) => p.toLowerCase() === "admin" || p === "manage_users");
};

const paramId = (req: Request): string | undefined => {
  const raw = req.params.id;
  if (Array.isArray(raw)) return raw[0];
  return raw;
};

const ownerOrAdmin = (postUserId: unknown, me: LocalUser): boolean => {
  if (isAdmin(me)) return true;
  const uid =
    postUserId &&
    typeof postUserId === "object" &&
    postUserId !== null &&
    "_id" in postUserId
      ? String((postUserId as { _id: mongoose.Types.ObjectId })._id)
      : String(postUserId);
  return uid === String(me._id);
};

// [GET] /api/v1/posts
export const index = async (req: Request, res: Response): Promise<void> => {
  try {
    const find: Record<string, unknown> = {
      deleted: false,
      status: "active",
    };

    if (req.query.categoryId) {
      const cid = req.query.categoryId.toString();
      if (!mongoose.Types.ObjectId.isValid(cid)) {
        res.status(400).json({
          code: 400,
          message: "categoryId không hợp lệ",
          data: null,
        });
        return;
      }
      find.categoryId = cid;
    }

    const objectSearch = searchHelper(req.query);
    if (req.query.keyword && objectSearch.regex) {
      find.title = objectSearch.regex;
    }

    const initPagination = {
      currentPage: 1,
      limitItems: 5,
    };

    const countPosts = await Post.countDocuments(find);
    const objectPagination = paginationHelper(
      initPagination,
      req.query,
      countPosts,
    );

    const allowedSortKeys = new Set(["title", "createdAt"]);
    let sortKey = "createdAt";
    if (req.query.sortKey) {
      const k = req.query.sortKey.toString();
      if (allowedSortKeys.has(k)) sortKey = k;
    }
    const sortDir =
      req.query.sortValue?.toString().toLowerCase() === "asc" ? 1 : -1;
    const sort: Record<string, 1 | -1> = { [sortKey]: sortDir };

    const posts = await Post.find(find)
      .sort(sort)
      .limit(objectPagination.limitItems)
      .skip(objectPagination.skip ?? 0)
      .populate("userId", "username")
      .populate("categoryId", "title slug")
      .lean();

    res.json({
      code: 200,
      message: "Success",
      data: posts,
      pagination: {
        currentPage: objectPagination.currentPage,
        limitItems: objectPagination.limitItems,
        totalItems: countPosts,
        totalPages: objectPagination.totalPages ?? 0,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error";
    res.status(500).json({
      code: 500,
      message,
      data: null,
    });
  }
};

// [GET] /api/v1/posts/detail/:id
export const detail = async (req: Request, res: Response): Promise<void> => {
  const id = paramId(req);
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({
      code: 400,
      message: "Id không hợp lệ",
      data: null,
    });
    return;
  }

  const post = await Post.findOne({
    _id: id,
    deleted: false,
    status: "active",
  })
    .populate("userId", "username")
    .populate("categoryId", "title")
    .lean();

  if (!post) {
    res.status(404).json({
      code: 404,
      message: "Không tìm thấy bài viết",
      data: null,
    });
    return;
  }

  const doc = post as Record<string, unknown> & {
    userId?: { _id: mongoose.Types.ObjectId; username?: string };
    categoryId?: { _id: mongoose.Types.ObjectId; title?: string };
  };

  const { userId, categoryId, ...rest } = doc;

  res.json({
    code: 200,
    message: "Success",
    data: {
      ...rest,
      user: userId
        ? { _id: userId._id, username: userId.username ?? "" }
        : null,
      category: categoryId
        ? { _id: categoryId._id, title: categoryId.title ?? "" }
        : null,
    },
  });
};

// [POST] /api/v1/posts/create
export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const me = res.locals.user as LocalUser;
    const { title, content, thumbnail, categoryId } = req.body as {
      title?: string;
      content?: string;
      thumbnail?: string;
      categoryId?: string;
    };

    if (
      typeof title !== "string" ||
      !title.trim() ||
      typeof content !== "string" ||
      !content.trim() ||
      typeof categoryId !== "string" ||
      !mongoose.Types.ObjectId.isValid(categoryId)
    ) {
      res.status(400).json({
        code: 400,
        message: "Vui lòng gửi title, content và categoryId hợp lệ",
        data: null,
      });
      return;
    }

    const category = await Category.findOne({
      _id: categoryId,
      deleted: false,
      status: "active",
    });
    if (!category) {
      res.status(400).json({
        code: 400,
        message: "Danh mục không tồn tại hoặc không khả dụng",
        data: null,
      });
      return;
    }

    const record = new Post({
      title: title.trim(),
      content: content.trim(),
      thumbnail: typeof thumbnail === "string" ? thumbnail : "",
      categoryId,
      userId: me._id,
      status: "active",
      deleted: false,
    });

    const data = await record.save();
    const populated = await Post.findById(data._id)
      .populate("userId", "username")
      .populate("categoryId", "title")
      .lean();

    const p = populated as Record<string, unknown> & {
      userId?: { _id: mongoose.Types.ObjectId; username?: string };
      categoryId?: { _id: mongoose.Types.ObjectId; title?: string };
    } | null;

    if (!p) {
      res.json({
        code: 200,
        message: "Tạo thành công!",
        data,
      });
      return;
    }

    const { userId, categoryId: cat, ...rest } = p;

    res.json({
      code: 200,
      message: "Tạo thành công!",
      data: {
        ...rest,
        user: userId
          ? { _id: userId._id, username: userId.username ?? "" }
          : null,
        category: cat
          ? { _id: cat._id, title: cat.title ?? "" }
          : null,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Lỗi!";
    res.status(400).json({
      code: 400,
      message,
      data: null,
    });
  }
};

// [PATCH] /api/v1/posts/edit/:id
export const edit = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = paramId(req);
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        code: 400,
        message: "Id không hợp lệ",
        data: null,
      });
      return;
    }

    const me = res.locals.user as LocalUser;
    const post = await Post.findOne({ _id: id, deleted: false });

    if (!post) {
      res.status(404).json({
        code: 404,
        message: "Không tìm thấy bài viết",
        data: null,
      });
      return;
    }

    if (!ownerOrAdmin(post.userId, me)) {
      res.status(403).json({
        code: 403,
        message: "Không có quyền chỉnh sửa bài viết này",
        data: null,
      });
      return;
    }

    if (!isAdmin(me) && req.body.status !== undefined) {
      res.status(403).json({
        code: 403,
        message: "Chỉ admin mới được cập nhật status",
        data: null,
      });
      return;
    }

    const patch: Record<string, unknown> = {};

    if (typeof req.body.title === "string" && req.body.title.trim()) {
      patch.title = req.body.title.trim();
    }
    if (typeof req.body.content === "string" && req.body.content.trim()) {
      patch.content = req.body.content.trim();
    }
    if (typeof req.body.thumbnail === "string") {
      patch.thumbnail = req.body.thumbnail;
    }

    if (req.body.categoryId !== undefined) {
      const cid = String(req.body.categoryId);
      if (!mongoose.Types.ObjectId.isValid(cid)) {
        res.status(400).json({
          code: 400,
          message: "categoryId không hợp lệ",
          data: null,
        });
        return;
      }
      const category = await Category.findOne({
        _id: cid,
        deleted: false,
        status: "active",
      });
      if (!category) {
        res.status(400).json({
          code: 400,
          message: "Danh mục không tồn tại hoặc không khả dụng",
          data: null,
        });
        return;
      }
      patch.categoryId = category._id;
    }

    if (isAdmin(me) && req.body.status !== undefined) {
      if (!["active", "inactive"].includes(req.body.status)) {
        res.status(400).json({
          code: 400,
          message: "status phải là active hoặc inactive",
          data: null,
        });
        return;
      }
      patch.status = req.body.status;
    }

    if (Object.keys(patch).length === 0) {
      res.status(400).json({
        code: 400,
        message: "Không có dữ liệu hợp lệ để cập nhật",
        data: null,
      });
      return;
    }

    const updated = await Post.findOneAndUpdate(
      { _id: id, deleted: false },
      { $set: patch },
      { new: true, runValidators: true },
    )
      .populate("userId", "username")
      .populate("categoryId", "title")
      .lean();

    if (!updated) {
      res.status(404).json({
        code: 404,
        message: "Không tìm thấy bài viết",
        data: null,
      });
      return;
    }

    const doc = updated as Record<string, unknown> & {
      userId?: { _id: mongoose.Types.ObjectId; username?: string };
      categoryId?: { _id: mongoose.Types.ObjectId; title?: string };
    };
    const { userId, categoryId, ...rest } = doc;

    res.json({
      code: 200,
      message: "Cập nhật thành công!",
      data: {
        ...rest,
        user: userId
          ? { _id: userId._id, username: userId.username ?? "" }
          : null,
        category: categoryId
          ? { _id: categoryId._id, title: categoryId.title ?? "" }
          : null,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Lỗi!";
    res.status(400).json({
      code: 400,
      message,
      data: null,
    });
  }
};

// [DELETE] /api/v1/posts/delete/:id
export const deletePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = paramId(req);
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        code: 400,
        message: "Id không hợp lệ",
        data: null,
      });
      return;
    }

    const me = res.locals.user as LocalUser;
    const post = await Post.findOne({ _id: id, deleted: false });

    if (!post) {
      res.status(404).json({
        code: 404,
        message: "Không tìm thấy bài viết",
        data: null,
      });
      return;
    }

    if (!ownerOrAdmin(post.userId, me)) {
      res.status(403).json({
        code: 403,
        message: "Không có quyền xóa bài viết này",
        data: null,
      });
      return;
    }

    await Post.updateOne({ _id: id }, { $set: { deleted: true } });

    res.json({
      code: 200,
      message: "Xóa thành công!",
      data: null,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Lỗi!";
    res.status(400).json({
      code: 400,
      message,
      data: null,
    });
  }
};
