// models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    avater: { type: String },
    email: { type: String, required: true, unique: true },
    companyName: { type: String },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "dispatcher", "driver"],
      default: "dispatcher",
    },
  },
  { timestamps: true },
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
