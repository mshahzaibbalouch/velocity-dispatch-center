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
    // Driver-specific fields
    status: {
      type: String,
      enum: ["online", "offline", "on_trip", "break"],
      default: "offline",
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    rideCount: {
      type: Number,
      default: 0,
    },
    vehicleInfo: {
      make: { type: String },
      model: { type: String },
      year: { type: Number },
      licensePlate: { type: String },
      color: { type: String },
    },
    phoneNumber: { type: String },
    licenseNumber: { type: String },
    totalEarnings: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
