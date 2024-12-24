import { Response, NextFunction } from "express";
import { CustomRequest } from "./authenticate";

export const authorize = (roles: string[]) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};
