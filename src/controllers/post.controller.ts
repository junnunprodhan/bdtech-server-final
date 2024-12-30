import { Request, Response } from "express";
import Post, { IPost } from "../models/post.model";

// Create a new post

export const createPost = async (req: Request, res: Response) => {
  console.log("reqbody:", req.body);
  try {
    const { title, username, userImage, description, image, category } =
      req.body;

    const newPost: IPost = new Post({
      title,
      username,
      image,
      category,
      userImage,
      description,
      likes: 0,
      comments: [],
    });
    console.log("🚀 ~ createPost ~ description:", description);

    const savedPost = await newPost.save();
    console.log("🚀 ~ createPost ~ savedPost:", savedPost);
    res.status(201).json(savedPost);
  } catch (error) {
    console.log("🚀 ~ createPost ~ error:", error);

    res.status(500).json({ error: "Failed to create post" });
  }
};

// Get all posts
export const getPosts = async (_req: Request, res: Response) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

// Get a single post by ID
export const getPostById = async (req: any, res: any) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch post" });
  }
};

// Update a post (e.g., add a like or update description)
export const updatePost = async (req: Request, res: Response) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedPost) return res.status(404).json({ error: "Post not found" });
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: "Failed to update post" });
  }
};

// Delete a post
export const deletePost = async (req: any, res: any) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) return res.status(404).json({ error: "Post not found" });
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.log("🚀 ~ deletePost ~ error:", error);
    res.status(500).json({ error: "Failed to delete post" });
  }
};
