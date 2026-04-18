import { Request, Response } from "express";
import Category from "../models/category.model";

// [GET] /api/v1/categories
export const index = async (req: Request, res: Response) => {
  const records = await Category.find({ deleted: false });

  res.json({
    code: 200,
    message: "Success",
    data: records,
  });
};

// [POST] /api/v1/categories
export const create = async (req: Request, res: Response) => {
  try {
    const record = new Category(req.body);
    const data = await record.save();

    res.json({
      code: 201,
      message: "Tạo mới thành công",
      data,
    });
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: "Lỗi dữ liệu đầu vào",
      data: null,
    });
  }
};

// [PATCH] /api/v1/categories/:id
export const edit = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await Category.updateOne({ _id: id, deleted: false }, req.body);

    res.json({
      code: 200,
      message: "Cập nhật thành công",
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: "Lỗi dữ liệu đầu vào",
      data: null,
    });
  }
};

// [DELETE] /api/v1/categories/:id (soft delete)
export const deleteRecord = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await Category.updateOne({ _id: id }, { deleted: true });

    res.json({
      code: 200,
      message: "Xóa thành công",
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: "Lỗi dữ liệu đầu vào",
      data: null,
    });
  }
};

