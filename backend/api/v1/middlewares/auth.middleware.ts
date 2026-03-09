import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import Role from "../models/role.model";

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  if (req.headers.authorization) {
    const token: string = req.headers.authorization.split(" ")[1];

    const user = await User.findOne({
      token: token,
      deleted: false,
    }).select("-password");

    if (!user) {
      res.json({
        code: 400,
        message: "token không hợp lệ!",
      });
      return;
    }

    const role = await Role.findOne({
      // _id: user.role_id,
    }).select("title permissions");

    res.locals.user = user;
    res.locals.role = role;

    next();
  } else {
    res.json({
      code: 400,
      message: "Vui lòng gửi kèm token!",
    });
  }
};
