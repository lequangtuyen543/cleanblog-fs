import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    permissions: {
      type: [String],
      default: [],
    },
    deleted: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  { timestamps: true },
);

roleSchema.index({ title: 1 }, { unique: true });

const Role = mongoose.model("Role", roleSchema, "roles");

export default Role;