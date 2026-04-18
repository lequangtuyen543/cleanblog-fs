import { Request, Response } from "express";
import md5 from "md5";
import User from "../models/user.model";
import * as generateHelper from "../../../helpers/generate";
import Role from "../models/role.model";

// [POST] /api/v1/auth/register
export const register = async (req: Request, res: Response) => {
  req.body.password = md5(req.body.password);

  const existEmail = await User.findOne({
    email: req.body.email,
    deleted: false,
  });
  const existUsername = await User.findOne({
    username: req.body.username,
    deleted: false,
  });

  if (existEmail) {
    res.json({
      code: 400,
      message: "Email đã tồn tại!",
    });
  } else if (existUsername) {
    res.json({
      code: 400,
      message: "Tên đăng nhập đã tồn tại!",
    });
  } else {
    let defaultRole = await Role.findOne({
      title: { $in: ["User", "user", "USER"] },
      deleted: false,
    });

    if (!defaultRole) {
      defaultRole = await Role.findOne({ deleted: false });
    }

    if (!defaultRole) {
      defaultRole = await new Role({
        title: "User",
        description: "Default user role",
        permissions: [],
      }).save();
    }

    const user = new User({
      fullName: req.body.fullName,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      token: generateHelper.generateRandomString(20),
      roleId: defaultRole._id,
    });

    user.save();

    const token = user.get("token");
    res.cookie("token", token);

    res.json({
      code: 200,
      message: "Đăng ký thành công!",
      token: token,
    });
  }
};

// [POST] /api/v1/auth/login
export const login = async (req: Request, res: Response) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = await User.findOne({
    username: username,
    deleted: false,
  }).select("+password");

  if (!user) {
    res.json({
      code: 400,
      message: "username không tồn tại!",
    });
    return;
  }

  if (md5(password) !== user.get("password")) {
    res.json({
      code: 400,
      message: "Sai mật khẩu!",
    });
    return;
  }

  const token = user.get("token");
  res.cookie("token", token);

  const safeUser = user.toObject();
  delete safeUser.password;

  res.json({
    code: 200,
    message: "Đăng nhập thành công!",
    token: token,
    user: safeUser,
  });
};

