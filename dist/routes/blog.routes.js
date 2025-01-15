"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blog_controller_1 = require("../controllers/blog.controller");
const router = express_1.default.Router();
// POST: Create a new post
router.post("/", blog_controller_1.createBlog);
// GET: Fetch all posts
router.get("/", blog_controller_1.getblogs);
// // GET: Fetch a single post by ID
router.get("/:id", blog_controller_1.getBlogById);
// PUT: Update a post by ID
// router.put("/:id", updateBlog);
// DELETE: Delete a post by ID
router.delete("/:id", blog_controller_1.deleteBlog);
exports.default = router;
