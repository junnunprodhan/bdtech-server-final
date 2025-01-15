"use strict";
// import { Request, Response } from "express";
// import axios from "axios";
// import fs from "fs";
// import FormData from "form-data";
// import sharp from "sharp";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = void 0;
const axios_1 = __importDefault(require("axios"));
const sharp_1 = __importDefault(require("sharp"));
const form_data_1 = __importDefault(require("form-data"));
const multer_1 = __importDefault(require("multer"));
// Your ImgBB API Key
const IMGBB_API_KEY = "f7959b2ff8c62b91e197a2b5f507eb13";
// Multer setup for in-memory file processing
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
// Controller function for image upload and enhancement
const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            res.status(400).json({ success: false, message: "No file uploaded" });
            return;
        }
        const buffer = req.file.buffer; // Access the in-memory buffer from the uploaded file
        console.log("Processing image with Sharp...");
        // Enhance the image using Sharp
        const enhancedBuffer = await (0, sharp_1.default)(buffer)
            .resize(1920, 1080, { fit: "cover" }) // Resize to HD
            .sharpen() // Enhance sharpness
            .modulate({ brightness: 1.1, saturation: 1.2 }) // Adjust brightness and saturation
            .toBuffer();
        // Optionally, apply a blur effect
        const blurredBuffer = await (0, sharp_1.default)(enhancedBuffer)
            .blur(10) // Apply background blur
            .toBuffer();
        console.log("Sharp processing completed");
        // Prepare the enhanced image for uploading to ImgBB
        const formData = new form_data_1.default();
        formData.append("image", blurredBuffer.toString("base64")); // Convert buffer to Base64 string
        console.log("Uploading image to ImgBB...");
        const response = await axios_1.default.post(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, formData, {
            headers: {
                ...formData.getHeaders(),
            },
        });
        // Get the uploaded image URL from ImgBB response
        const imageUrl = response.data.data.url;
        console.log("Upload successful:", imageUrl);
        res.status(200).json({ success: true, imageUrl });
    }
    catch (err) {
        console.error("Error:", err.message);
        res.status(500).json({ success: false, message: "Image upload failed" });
    }
};
exports.uploadImage = uploadImage;
// Express route
