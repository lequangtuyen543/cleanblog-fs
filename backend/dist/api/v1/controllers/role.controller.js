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
exports.createRecord = exports.index = void 0;
const role_model_1 = __importDefault(require("../models/role.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let find = {
        deleted: false,
    };
    const records = yield role_model_1.default.find(find);
    res.json({
        code: 200,
        message: "Thành công!",
        data: records,
    });
});
exports.index = index;
const createRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const record = new role_model_1.default(req.body);
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
exports.createRecord = createRecord;
