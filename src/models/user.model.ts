import mongoose, { Schema, Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";
export interface IUser extends Document {
  name: string;
  username: string;
  email: string;
  password: string;
  role: "user" | "admin" | "superAdmin";
  image?: string;
  description?: string;
  userId: string;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userId: { type: String, unique: true, default: uuidv4 },
    role: {
      type: String,
      enum: ["user", "admin", "superAdmin"],
      default: "user",
    },
    image: { type: String },
    description: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
