import express from "express";
import {
  createBlog,
  deleteBlog,
  getBlogById,
  getblogs,
  updateBlog,
} from "../controllers/blog.controller";

const router = express.Router();

// POST: Create a new post
router.post("/", createBlog);

// GET: Fetch all posts
router.get("/", getblogs);

// // GET: Fetch a single post by ID
router.get("/:id", getBlogById);

// PUT: Update a post by ID
// router.put("/:id", updateBlog);

// DELETE: Delete a post by ID
router.delete("/:id", deleteBlog);

export default router;
