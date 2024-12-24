import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import User from "../models/user.model";
import mongoose from "mongoose";

export const register = async (req: Request, res: Response) => {
  const { name, username, email, password, role, image, description } =
    req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      username,
      email,
      password: hashedPassword,
      role,
      image,
      description,
      userId: new mongoose.Types.ObjectId().toString(),
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

// export const login = async (req: Request, res: Response) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET || "secret",
//       { expiresIn: "1h" }
//     );

//     res.status(200).json({ message: "Login successful", token });
//   } catch (error) {
//     res.status(500).json({ message: "Error logging in", error });
//   }
// };
// export const login = async (
//   req: Request,
//   res: Response
// ): Promise<Response | void> => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET || "secret",
//       { expiresIn: "1h" }
//     );

//     return res.status(200).json({ message: "Login successful", token });
//   } catch (error) {
//     return res.status(500).json({ message: "Error logging in", error });
//   }
// };

export const login = async (
  req: any, // Use default Request type
  res: any
): Promise<any | void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1h" }
    );

    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    return res.status(500).json({ message: "Error logging in", error });
  }
};
