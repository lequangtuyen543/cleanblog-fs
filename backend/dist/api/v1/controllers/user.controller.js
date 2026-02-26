"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.edit = exports.detail = exports.create = exports.list = exports.info = exports.login = exports.register = void 0;
const md5_1 = __importDefault(require("md5"));
const user_model_1 = __importDefault(require("../models/user.model"));
const generateHelper = __importStar(require("../../../helpers/generate"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.body.password = (0, md5_1.default)(req.body.password);
    const existEmail = yield user_model_1.default.findOne({ email: req.body.email, deleted: false });
    const existUsername = yield user_model_1.default.findOne({ username: req.body.username, deleted: false });
    if (existEmail) {
        res.json({
            code: 400,
            message: "Email đã tồn tại!",
        });
    }
    else if (existUsername) {
        res.json({
            code: 400,
            message: "Tên đăng nhập đã tồn tại!",
        });
    }
    else {
        const user = new user_model_1.default({
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
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const user = yield user_model_1.default.findOne({
        username: username,
        deleted: false
    });
    if (!user) {
        res.json({
            code: 400,
            message: "username không tồn tại!",
        });
        return;
    }
    if ((0, md5_1.default)(password) !== user.password) {
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
});
exports.login = login;
const info = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        code: 200,
        message: "Thành công",
        data: res.locals.user
    });
});
exports.info = info;
const list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.default.find({
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
});
exports.list = list;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.body.password = (0, md5_1.default)(req.body.password);
    const existEmail = yield user_model_1.default.findOne({ email: req.body.email, deleted: false });
    const existUsername = yield user_model_1.default.findOne({ username: req.body.username, deleted: false });
    if (existEmail) {
        res.json({
            code: 400,
            message: "Email đã tồn tại!",
        });
    }
    else if (existUsername) {
        res.json({
            code: 400,
            message: "Tên đăng nhập đã tồn tại!",
        });
    }
    else {
        const user = new user_model_1.default({
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
});
exports.create = create;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const user = yield user_model_1.default.findOne({
        _id: id,
        deleted: false,
    });
    res.json(user);
});
exports.detail = detail;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield user_model_1.default.updateOne({ _id: id }, req.body);
        res.json({
            code: 200,
            message: "Cập nhật thành công!",
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Lỗi!",
        });
    }
});
exports.edit = edit;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield user_model_1.default.updateOne({ _id: id }, {
            deleted: true,
            deletedAt: new Date()
        });
        res.json({
            code: 200,
            message: "Xóa thành công!",
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Lỗi!",
        });
    }
});
exports.deleteUser = deleteUser;
