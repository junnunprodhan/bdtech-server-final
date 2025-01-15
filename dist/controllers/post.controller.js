"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.getPostById = exports.getPosts = exports.createPost = void 0;
const post_model_1 = __importDefault(require("../models/post.model"));
// Create a new post
const createPost = async (req, res) => {
    console.log("reqbody:", req.body);
    try {
        const { title, username, userImage, description, image, category } = req.body;
        const newPost = new post_model_1.default({
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
    }
    catch (error) {
        console.log("🚀 ~ createPost ~ error:", error);
        res.status(500).json({ error: "Failed to create post" });
    }
};
exports.createPost = createPost;
// Get all posts
const getPosts = async (_req, res) => {
    try {
        const posts = await post_model_1.default.find().sort({ createdAt: -1 });
        res.status(200).json(posts);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch posts" });
    }
};
exports.getPosts = getPosts;
// Get a single post by ID
const getPostById = async (req, res) => {
    try {
        const post = await post_model_1.default.findById(req.params.id);
        if (!post)
            return res.status(404).json({ error: "Post not found" });
        res.status(200).json(post);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch post" });
    }
};
exports.getPostById = getPostById;
// Update a post (e.g., add a like or update description)
const updatePost = async (req, res) => {
    try {
        const updatedPost = await post_model_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!updatedPost)
            return res.status(404).json({ error: "Post not found" });
        res.status(200).json(updatedPost);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to update post" });
    }
};
exports.updatePost = updatePost;
// Delete a post
const deletePost = async (req, res) => {
    try {
        const deletedPost = await post_model_1.default.findByIdAndDelete(req.params.id);
        if (!deletedPost)
            return res.status(404).json({ error: "Post not found" });
        res.status(200).json({ message: "Post deleted successfully" });
    }
    catch (error) {
        console.log("🚀 ~ deletePost ~ error:", error);
        res.status(500).json({ error: "Failed to delete post" });
    }
};
exports.deletePost = deletePost;
