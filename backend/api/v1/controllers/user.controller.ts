import { Request, Response } from "express";
import mongoose from "mongoose";
import md5 from "md5";
import User from "../models/user.model";
import Role from "../models/role.model";
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

const isPopulatedRole = (
  roleId: unknown,
): roleId is { _id: mongoose.Types.ObjectId; title?: string; permissions?: string[] } =>
  Boolean(
    roleId &&
      typeof roleId === "object" &&
      roleId !== null &&
      "title" in roleId,
  );

// [GET] /api/v1/users/info
export const info = async (req: Request, res: Response): Promise<void> => {
  const raw = res.locals.user as Record<string, unknown>;
  const safe: Record<string, unknown> = { ...raw };
  delete safe.password;
  delete safe.token;

  res.json({
    code: 200,
    message: "Thành công",
    data: safe,
  });
};

// [GET] /api/v1/users (Admin)
export const list = async (req: Request, res: Response): Promise<void> => {
  try {
    const me = res.locals.user as LocalUser;
    if (!isAdmin(me)) {
      res.status(403).json({
        code: 403,
        message: "Không có quyền truy cập",
        data: null,
      });
      return;
    }

    const find: Record<string, unknown> = {
      deleted: false,
    };

    if (req.query.keyword) {
      const objectSearch = searchHelper(req.query);
      if (objectSearch.regex) {
        find.$or = [
          { username: objectSearch.regex },
          { email: objectSearch.regex },
        ];
      }
    }

    const initPagination = {
      currentPage: 1,
      limitItems: 10,
    };

    const countUsers = await User.countDocuments(find);
    const objectPagination = paginationHelper(
      initPagination,
      req.query,
      countUsers,
    );

    const sort: Record<string, 1 | -1> = { createdAt: -1 };

    const users = await User.find(find)
      .select("-password -token")
      .sort(sort)
      .limit(objectPagination.limitItems)
      .skip(objectPagination.skip ?? 0)
      .populate("roleId", "title permissions")
      .lean();

    const data = users.map((u) => {
      const doc = u as Record<string, unknown> & { roleId?: unknown };
      const { roleId, ...rest } = doc;
      if (isPopulatedRole(roleId)) {
        return { ...rest, role: roleId, roleId: roleId._id };
      }
      return { ...rest, role: null, roleId };
    });

    res.json({
      code: 200,
      message: "Success",
      data,
      pagination: {
        currentPage: objectPagination.currentPage,
        limitItems: objectPagination.limitItems,
        totalItems: countUsers,
        totalPages: objectPagination.totalPages ?? 0,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Lỗi!";
    res.status(500).json({
      code: 500,
      message,
      data: null,
    });
  }
};

// [PATCH] /api/v1/users/edit/:id
export const edit = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        code: 400,
        message: "Id không hợp lệ",
        data: null,
      });
      return;
    }

    const me = res.locals.user as LocalUser;
    const meId = String(me._id);
    const admin = isAdmin(me);

    if (!admin && meId !== id) {
      res.status(403).json({
        code: 403,
        message: "Không có quyền cập nhật người dùng này",
        data: null,
      });
      return;
    }

    if (!admin && (req.body.roleId !== undefined || req.body.status !== undefined)) {
      res.status(403).json({
        code: 403,
        message: "Chỉ admin mới được cập nhật roleId hoặc status",
        data: null,
      });
      return;
    }

    const existing = await User.findOne({ _id: id, deleted: false });
    if (!existing) {
      res.status(404).json({
        code: 404,
        message: "Không tìm thấy người dùng",
        data: null,
      });
      return;
    }

    const patch: Record<string, unknown> = {};

    if (typeof req.body.username === "string") {
      patch.username = req.body.username.trim();
    }
    if (typeof req.body.avatar === "string") {
      patch.avatar = req.body.avatar;
    }

    if (admin) {
      if (req.body.roleId !== undefined) {
        if (!mongoose.Types.ObjectId.isValid(String(req.body.roleId))) {
          res.status(400).json({
            code: 400,
            message: "roleId không hợp lệ",
            data: null,
          });
          return;
        }
        const role = await Role.findOne({
          _id: req.body.roleId,
          deleted: false,
        });
        if (!role) {
          res.status(400).json({
            code: 400,
            message: "Vai trò không tồn tại",
            data: null,
          });
          return;
        }
        patch.roleId = role._id;
      }
      if (req.body.status !== undefined) {
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
    }

    if (Object.keys(patch).length === 0) {
      res.status(400).json({
        code: 400,
        message: "Không có dữ liệu hợp lệ để cập nhật",
        data: null,
      });
      return;
    }

    if (patch.username !== undefined) {
      const dup = await User.findOne({
        _id: { $ne: id },
        deleted: false,
        username: patch.username,
      });
      if (dup) {
        res.status(400).json({
          code: 400,
          message: "Tên đăng nhập đã được sử dụng",
          data: null,
        });
        return;
      }
    }

    const updated = await User.findOneAndUpdate(
      { _id: id, deleted: false },
      { $set: patch },
      { new: true, runValidators: true },
    )
      .select("-password -token")
      .populate("roleId", "title permissions")
      .lean();

    if (!updated) {
      res.status(404).json({
        code: 404,
        message: "Không tìm thấy người dùng",
        data: null,
      });
      return;
    }

    const doc = updated as Record<string, unknown> & { roleId?: unknown };
    const { roleId, ...rest } = doc;
    const data =
      isPopulatedRole(roleId)
        ? { ...rest, role: roleId, roleId: roleId._id }
        : { ...rest, role: null, roleId };

    res.json({
      code: 200,
      message: "Cập nhật thành công",
      data,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Lỗi!";
    res.status(500).json({
      code: 500,
      message,
      data: null,
    });
  }
};

// [PATCH] /api/v1/users/change-password
export const changePassword = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const id = (res.locals.user as LocalUser)._id;
    const { oldPassword, newPassword } = req.body as {
      oldPassword?: string;
      newPassword?: string;
    };

    if (
      typeof oldPassword !== "string" ||
      typeof newPassword !== "string" ||
      !oldPassword ||
      !newPassword
    ) {
      res.status(400).json({
        code: 400,
        message: "Vui lòng gửi oldPassword và newPassword",
        data: null,
      });
      return;
    }

    const user = await User.findOne({ _id: id, deleted: false }).select(
      "+password",
    );

    if (!user) {
      res.status(404).json({
        code: 404,
        message: "User không tồn tại!",
        data: null,
      });
      return;
    }

    if (md5(oldPassword) !== user.get("password")) {
      res.status(400).json({
        code: 400,
        message: "Mật khẩu cũ không đúng!",
        data: null,
      });
      return;
    }

    if (newPassword.length < 6) {
      res.status(400).json({
        code: 400,
        message: "Mật khẩu mới phải có ít nhất 6 ký tự",
        data: null,
      });
      return;
    }

    await User.updateOne(
      { _id: id },
      { password: md5(newPassword) },
    );

    res.json({
      code: 200,
      message: "Đổi mật khẩu thành công!",
      data: null,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Lỗi!";
    res.status(500).json({
      code: 500,
      message,
      data: null,
    });
  }
};
