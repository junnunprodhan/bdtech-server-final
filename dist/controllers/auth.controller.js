"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const register = async (req, res) => {
    const { name, username, email, password, role, image, description } = req.body;
    try {
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = new user_model_1.default({
            name,
            username,
            email,
            password: hashedPassword,
            role,
            image,
            description,
            userId: new mongoose_1.default.Types.ObjectId().toString(),
        });
        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error registering user", error });
    }
};
exports.register = register;
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
const login = async (req, // Use default Request type
res) => {
    const { email, password } = req.body;
    try {
        const user = await user_model_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id, name: user.name, image: user.image, role: user.role }, process.env.JWT_SECRET || "secret", { expiresIn: "1h" });
        console.log("🚀 ~ token:", token);
        return res.status(200).json({ message: "Login successful", token });
    }
    catch (error) {
        return res.status(500).json({ message: "Error logging in", error });
    }
};
exports.login = login;
