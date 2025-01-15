"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const image_controler_1 = require("../controllers/image.controler");
const router = express_1.default.Router();
// Multer configuration for file uploads
const upload = (0, multer_1.default)({ dest: "uploads/" });
// Route to upload an image
router.post("/upload", upload.single("image"), image_controler_1.uploadImage);
exports.default = router;
