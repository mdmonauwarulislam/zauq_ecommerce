import jwt from "jsonwebtoken"
import type { Response, NextFunction } from "express"
import User from "../models/User"
import type { AuthRequest, JWTPayload, ApiResponse } from "../types"

export const auth = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "")

    if (!token) {
      res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      } as ApiResponse)
      return
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as JWTPayload
    const user = await User.findById(decoded.userId).select("-password")

    if (!user || !user.isActive) {
      res.status(401).json({
        success: false,
        message: "Invalid token or user not found.",
      } as ApiResponse)
      return
    }

    req.user = user
    next()
  } catch (error: any) {
    console.error("Auth middleware error:", error)
    res.status(401).json({
      success: false,
      message: "Invalid token.",
    } as ApiResponse)
  }
}

export const adminAuth = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    await auth(req, res, () => {
      if (!req.user || req.user.role !== "admin") {
        res.status(403).json({
          success: false,
          message: "Access denied. Admin privileges required.",
        } as ApiResponse)
        return
      }
      next()
    })
  } catch (error: any) {
    console.error("Admin auth middleware error:", error)
    res.status(401).json({
      success: false,
      message: "Authentication failed.",
    } as ApiResponse)
  }
}
