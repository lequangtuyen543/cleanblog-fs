import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: String, 
  username: String, 
  email: String,
  password: String,
  token: String,
  status: {
    default: "active",
    type: String
  },
  deleted: {
    type: Boolean,
    default: false
  },
  deleteAt: Date
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema, 'users');

export default User;