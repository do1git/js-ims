import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  avatar: { type: String },
  name: { type: String, required: true },
  grade: { type: String, required: true },
  department: { type: String, required: true },
  email: { type: String },
  mobile: { type: String, required: true },
  permission_plan: { type: Boolean, default: false },
  permission_user: { type: Boolean, default: false },
  password: { type: String, required: true },
  birthDay: { type: String },
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 5);
});

const User = mongoose.model("User", userSchema);

export default User;
