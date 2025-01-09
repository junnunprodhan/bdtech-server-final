// import { Request, Response } from "express";
// import axios from "axios";
// import fs from "fs";
// import FormData from "form-data";
// import sharp from "sharp";

// // Your ImgBB API Key
// const IMGBB_API_KEY = "f7959b2ff8c62b91e197a2b5f507eb13";

// export const uploadImage = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     if (!req.file) {
//       res.status(400).json({ success: false, message: "No file uploaded" });
//       return;
//     }

//     const filePath = req.file.path;

//     // Enhance the image using Sharp
//     const enhancedImagePath = `uploads/enhanced-${Date.now()}.jpg`;
//     await sharp(filePath)
//       .resize(1920, 1080, { fit: "cover" }) // Resize to HD
//       .sharpen() // Enhance sharpness
//       .modulate({ brightness: 1.1, saturation: 1.2 }) // Add brightness and saturation
//       .toFile(enhancedImagePath);

//     // Optionally, apply a blur effect
//     const blurredImagePath = `uploads/blurred-${Date.now()}.jpg`;
//     await sharp(enhancedImagePath)
//       .blur(10) // Apply background blur
//       .toFile(blurredImagePath);

//     // Prepare the enhanced image for uploading
//     const formData = new FormData();
//     formData.append("image", fs.createReadStream(enhancedImagePath));

//     // Upload enhanced image to ImgBB
//     const response = await axios.post(
//       //   `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`
//       "https:api.imgbb.com/1/upload?key=f7959b2ff8c62b91e197a2b5f507eb13",
//       formData,
//       {
//         headers: {
//           ...formData.getHeaders(),
//         },
//       }
//     );

//     // Cleanup local files
//     fs.unlinkSync(filePath);
//     fs.unlinkSync(enhancedImagePath);
//     fs.unlinkSync(blurredImagePath);

//     // Respond with the uploaded image URL
//     const imageUrl = response.data.data.url;
//     res.status(200).json({ success: true, imageUrl });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Image upload failed" });
//   }
// };

import { Request, Response } from "express";
import axios from "axios";
import sharp from "sharp";
import FormData from "form-data";
import multer from "multer";

// Your ImgBB API Key
const IMGBB_API_KEY = "f7959b2ff8c62b91e197a2b5f507eb13";

// Multer setup for in-memory file processing
const upload = multer({ storage: multer.memoryStorage() });

// Controller function for image upload and enhancement
export const uploadImage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ success: false, message: "No file uploaded" });
      return;
    }

    const buffer = req.file.buffer; // Access the in-memory buffer from the uploaded file

    console.log("Processing image with Sharp...");
    // Enhance the image using Sharp
    const enhancedBuffer = await sharp(buffer)
      .resize(1920, 1080, { fit: "cover" }) // Resize to HD
      .sharpen() // Enhance sharpness
      .modulate({ brightness: 1.1, saturation: 1.2 }) // Adjust brightness and saturation
      .toBuffer();

    // Optionally, apply a blur effect
    const blurredBuffer = await sharp(enhancedBuffer)
      .blur(10) // Apply background blur
      .toBuffer();

    console.log("Sharp processing completed");

    // Prepare the enhanced image for uploading to ImgBB
    const formData = new FormData();
    formData.append("image", blurredBuffer.toString("base64")); // Convert buffer to Base64 string

    console.log("Uploading image to ImgBB...");
    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
      formData,
      {
        headers: {
          ...formData.getHeaders(),
        },
      }
    );

    // Get the uploaded image URL from ImgBB response
    const imageUrl = response.data.data.url;
    console.log("Upload successful:", imageUrl);

    res.status(200).json({ success: true, imageUrl });
  } catch (err: any) {
    console.error("Error:", err.message);
    res.status(500).json({ success: false, message: "Image upload failed" });
  }
};

// Express route
