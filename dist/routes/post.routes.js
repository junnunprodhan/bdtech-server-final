"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_controller_1 = require("../controllers/post.controller");
const router = express_1.default.Router();
// POST: Create a new post
router.post("/", post_controller_1.createPost);
// GET: Fetch all posts
router.get("/", post_controller_1.getPosts);
// // GET: Fetch a single post by ID
router.get("/:id", post_controller_1.getPostById);
// // PUT: Update a post by ID
// router.put("/:id", updatePost);
// DELETE: Delete a post by ID
router.delete("/:id", post_controller_1.deletePost);
exports.default = router;
