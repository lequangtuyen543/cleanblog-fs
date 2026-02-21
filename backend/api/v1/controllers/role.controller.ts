import Role from "../models/roles.model";
import { Request, Response } from "express";
import systemConfig from "../../../config/system";

//[GET] /admin/roles
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

// //[GET] /admin/roles/create
// export const create = async (req: Request, res: Response) => {
//   res.render('admin/pages/roles/create', {
//     pageTitle: 'Create Roles'
//   });
// };

// //[POST] /admin/roles/create
// export const createPost = async (req: Request, res: Response) => {
//   console.log(req.body);

//   const record = new Role(req.body);
//   await record.save();

//   res.redirect(`${systemConfig.prefixAdmin}/roles`);
// };
