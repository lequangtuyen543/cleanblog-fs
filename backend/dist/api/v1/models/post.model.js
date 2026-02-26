"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const postSchema = new mongoose_1.default.Schema({
    title: String,
    subtitle: String,
    createdBy: String,
    createdAt: Date,
    status: {
        default: "active",
        type: String,
    },
    content: String,
    deleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: Date,
}, {
    timestamps: true,
});
const Post = mongoose_1.default.model("Post", postSchema, "posts");
exports.default = Post;
