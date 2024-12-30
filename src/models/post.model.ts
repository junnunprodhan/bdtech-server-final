import mongoose, { Schema, Document } from "mongoose";

export interface IPost extends Document {
  title: string;
  username: string;
  image?: string;
  userImage?: string;
  description: string;
  likes: number;
  comments: { username: string; text: string }[];
}

const PostSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    username: { type: String, required: true },
    image: { type: String, required: true },
    userImage: { type: String }, // Optional field
    description: { type: String, required: true },
    likes: { type: Number, default: 0 },
    comments: [
      {
        username: { type: String, required: true },
        text: { type: String, required: true },
      },
    ],
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

export default mongoose.model<IPost>("Post", PostSchema);
