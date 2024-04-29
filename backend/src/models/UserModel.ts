import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  login: String,
  password: String,
});

export const User = mongoose.model('User', UserSchema);