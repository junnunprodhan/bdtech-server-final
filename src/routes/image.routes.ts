import express from "express";
import multer from "multer";
import { uploadImage } from "../controllers/image.controler";

const router = express.Router();

// Multer configuration for file uploads
const upload = multer({ dest: "uploads/" });

// Route to upload an image
router.post("/upload", upload.single("image"), uploadImage);

export default router;
