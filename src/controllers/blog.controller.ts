import { Request, Response } from "express";
import Blog, { IBlog } from "../models/blog.model";

// Create a new post

export const createBlog = async (req: Request, res: Response) => {
  try {
    const { title, username, userImage, description, image, category } =
      req.body;

    const newBlog: IBlog = new Blog({
      title,
      username,
      image,
      category,
      userImage,
      description,
      likes: 0,
      comments: [],
    });

    const savedBlog = await newBlog.save();

    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(500).json({ error: "Failed to create blog" });
  }
};

// Get all posts
export const getblogs = async (_req: Request, res: Response) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
};

// Get a single post by ID
export const getBlogById = async (req: any, res: any) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Blog" });
  }
};

// Update a post (e.g., add a like or update description)
export const updateBlog = async (req: Request, res: Response) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedBlog) return res.status(404).json({ error: "Blog not found" });
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ error: "Failed to update Blog" });
  }
};

// Delete a post
export const deleteBlog = async (req: any, res: any) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) return res.status(404).json({ error: "Blog not found" });
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete Blog" });
  }
};
