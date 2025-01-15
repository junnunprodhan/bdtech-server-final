"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlog = exports.updateBlog = exports.getBlogById = exports.getblogs = exports.createBlog = void 0;
const blog_model_1 = __importDefault(require("../models/blog.model"));
// Create a new post
const createBlog = async (req, res) => {
    try {
        const { title, username, userImage, description, image, category } = req.body;
        const newBlog = new blog_model_1.default({
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
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create blog" });
    }
};
exports.createBlog = createBlog;
// Get all posts
const getblogs = async (_req, res) => {
    try {
        const blogs = await blog_model_1.default.find().sort({ createdAt: -1 });
        res.status(200).json(blogs);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch blogs" });
    }
};
exports.getblogs = getblogs;
// Get a single post by ID
const getBlogById = async (req, res) => {
    try {
        const blog = await blog_model_1.default.findById(req.params.id);
        if (!blog)
            return res.status(404).json({ error: "Blog not found" });
        res.status(200).json(blog);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch Blog" });
    }
};
exports.getBlogById = getBlogById;
// Update a post (e.g., add a like or update description)
const updateBlog = async (req, res) => {
    try {
        const updatedBlog = await blog_model_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!updatedBlog)
            return res.status(404).json({ error: "Blog not found" });
        res.status(200).json(updatedBlog);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to update Blog" });
    }
};
exports.updateBlog = updateBlog;
// Delete a post
const deleteBlog = async (req, res) => {
    try {
        const deletedBlog = await blog_model_1.default.findByIdAndDelete(req.params.id);
        if (!deletedBlog)
            return res.status(404).json({ error: "Blog not found" });
        res.status(200).json({ message: "Blog deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to delete Blog" });
    }
};
exports.deleteBlog = deleteBlog;
