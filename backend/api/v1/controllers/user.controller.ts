import { Request, Response } from "express";
import md5 from "md5"
import User from "../models/user.model";
import * as generateHelper from '../../../helpers/generate'

// [POST] /api/v1/users/register
export const register = async (req: Request, res: Response) => {
  req.body.password = md5(req.body.password);

  const existEmail = await User.findOne({ email: req.body.email, deleted: false });
  const existUsername = await User.findOne({ username: req.body.username, deleted: false });

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
    const user = new User({
      fullName: req.body.fullName,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      token: generateHelper.generateRandomString(20)
    });

    user.save();

    const token = user.token;
    res.cookie("token", token);

    res.json({
      code: 200,
      message: "Đăng ký thành công!",
      token: token
    });
  }
};

// [POST] /api/v1/users/login
export const login = async (req: Request, res: Response) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = await User.findOne({
    username: username,
    deleted: false
  })

  if (!user) {
    res.json({
      code: 400,
      message: "username không tồn tại!",
    });
    return;
  }

  if (md5(password) !== user.password) {
    res.json({
      code: 400,
      message: "Sai mật khẩu!",
    });
    return;
  }

  const token = user.token;
  res.cookie("token", token);

  res.json({
    code: 200,
    message: "Đăng nhập thành công!",
    token: token
  });
};

// [GET] /api/v1/users/info
export const info = async (req: Request, res: Response) => {
  res.json({
    code: 200,
    message: "Thành công",
    data: res.locals.user
  });
};

// [GET] /api/v1/users/list
export const list = async (req: Request, res: Response) => {

  const users = await User.find({
    deleted: false
  });

  if (!users) {
    res.json({
      code: 400,
      message: "Không có người dùng nào!",
    });
    return;
  }

  res.json({
    code: 200,
    message: "Lấy danh sách người dùng thành công!",
    data: users
  });
};

// [POST] /api/v1/users/create
export const create = async (req: Request, res: Response) => {
  req.body.password = md5(req.body.password);

  const existEmail = await User.findOne({ email: req.body.email, deleted: false });
  const existUsername = await User.findOne({ username: req.body.username, deleted: false });

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
    const user = new User({
      fullName: req.body.fullName,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      token: generateHelper.generateRandomString(20)
    });

    user.save();

    const token = user.token;
    res.cookie("token", token);

    res.json({
      code: 200,
      message: "Đăng ký thành công!",
      token: token
    });
  }
};

// [GET] /api/v1/users/detail/:id
export const detail = async (req: Request, res: Response) => {
  const id = req.params.id;

  const user = await User.findOne({
    _id: id,
    deleted: false,
  });

  res.json(user);
};


