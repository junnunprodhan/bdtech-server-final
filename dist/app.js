"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const db_1 = __importDefault(require("./config/db"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const post_routes_1 = __importDefault(require("./routes/post.routes"));
const blog_routes_1 = __importDefault(require("./routes/blog.routes"));
const image_routes_1 = __importDefault(require("./routes/image.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
// Database Connection
(0, db_1.default)();
app.use("/uploads", express_1.default.static("uploads"));
// Routes
app.use("/api/images", image_routes_1.default);
// Routes
app.use("/api/auth", auth_routes_1.default);
app.use("/api/posts", post_routes_1.default);
app.use("/api/blogs", blog_routes_1.default);
exports.default = app;
