import Role from "../models/role.model";
import { Request, Response } from "express";

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

//[PATCH] /api/v1/admin/roles/edit/:id
export const editRecord = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    await Role.updateOne({ _id: id }, req.body);

    res.json({
      code: 200,
      message: "Cập nhật thành công!",
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Lỗi cập nhật!",
    });
  }
};

// [DELETE] /api/v1/roles/delete/:id
export const deleteRecord = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    await Role.updateOne(
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

// [PATCH] /admin/roles/permissions-multi
export const permissions = async (req: Request, res: Response) => {
  const { permissions } = req.body;

  for (const item of permissions) {
    await Role.updateOne({ _id: item.id }, { permissions: item.permissions });
  }

  res.json({
    code: 200,
    message: "Cập nhật phân quyền thành công!",
  });
};
