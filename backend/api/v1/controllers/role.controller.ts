import Role from "../models/role.model";
import { Request, Response } from "express";
import systemConfig from "../../../config/system";

//[GET] /api/v1/admin/roles
export const index = async (req: Request, res: Response) => {
  let find = {
    deleted: false,
  };

  const records = await Role.find(find);

  res.json({
    code: 200,
    message: "Thành công!",
    data: records,
  });
};

//[POST] /api/v1/admin/roles/create
export const createRecord = async (req: Request, res: Response) => {
  try {
    const record = new Role(req.body);
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
