import { Request, Response } from "express";
import Setting from "../models/setting.model";

// [GET] /api/v1/settings
export const index = async (req: Request, res: Response) => {
  const records = await Setting.find({});

  res.json({
    code: 200,
    message: "Success",
    data: records,
  });
};

// [PATCH] /api/v1/settings
export const upsert = async (req: Request, res: Response) => {
  try {
    const { key, value } = req.body ?? {};
    if (!key) {
      res.status(400).json({
        code: 400,
        message: "Thiếu key",
        data: null,
      });
      return;
    }

    await Setting.updateOne(
      { key },
      { key, value: value ?? "" },
      { upsert: true },
    );

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

