"use strict";
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
exports.deletePost = exports.edit = exports.create = exports.detail = exports.index = void 0;
const post_model_1 = __importDefault(require("../models/post.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield post_model_1.default.find({ deleted: { $ne: true } });
    res.json(posts);
});
exports.index = index;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const post = yield post_model_1.default.findOne({ _id: id });
    res.json(post);
});
exports.detail = detail;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.body.createdAt = new Date();
        req.body.updatedAt = new Date();
        req.body.createdBy = res.locals.user.fullName;
        const record = new post_model_1.default(req.body);
        const data = yield record.save();
        res.json({
            code: 200,
            message: "Tạo thành công!",
            data: data,
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Lỗi!",
        });
    }
});
exports.create = create;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        console.log(req.body);
        yield post_model_1.default.updateOne({ _id: id }, req.body);
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
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield post_model_1.default.updateOne({ _id: id }, {
            deleted: true,
            deletedAt: new Date(),
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
exports.deletePost = deletePost;
