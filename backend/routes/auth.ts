import express, { type Response } from "express"
import jwt from "jsonwebtoken"
import { body, validationResult } from "express-validator"
import User from "../models/User"
import { auth } from "../middleware/auth"
import type { AuthRequest, ApiResponse, JWTPayload } from "../types"

const router = express.Router()

// Register
router.post(
  "/register",
  [
    body("name").trim().isLength({ min: 2 }).withMessage("Name must be at least 2 characters"),
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ],
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: errors.array(),
        } as ApiResponse)
        return
      }

      const { name, email, password } = req.body

      // Check if user already exists
      const existingUser = await User.findOne({ email })
      if (existingUser) {
        res.status(400).json({
          success: false,
          message: "User already exists with this email",
        } as ApiResponse)
        return
      }

      // Create new user
      const user = new User({ name, email, password })
      await user.save()

      // Generate JWT token
      const token = jwt.sign({ userId: user._id.toString() } as JWTPayload, process.env.JWT_SECRET || "", { expiresIn: "7d" })

      res.status(201).json({
        success: true,
        message: "User registered successfully",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      } as ApiResponse)
    } catch (error: any) {
      console.error("Registration error:", error)
      res.status(500).json({
        success: false,
        message: "Server error during registration",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      } as ApiResponse)
    }
  },
)

// Login
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password").exists().withMessage("Password is required"),
  ],
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: errors.array(),
        } as ApiResponse)
        return
      }

      const { email, password } = req.body

      // Find user
      const user = await User.findOne({ email })
      if (!user || !user.isActive) {
        res.status(401).json({
          success: false,
          message: "Invalid credentials",
        } as ApiResponse)
        return
      }

      // Check password
      const isMatch = await user.comparePassword(password)
      if (!isMatch) {
        res.status(401).json({
          success: false,
          message: "Invalid credentials",
        } as ApiResponse)
        return
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user._id.toString() } as JWTPayload, process.env.JWT_SECRET || "", { expiresIn: "7d" })

      res.json({
        success: true,
        message: "Login successful",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      } as ApiResponse)
    } catch (error: any) {
      console.error("Login error:", error)
      res.status(500).json({
        success: false,
        message: "Server error during login",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      } as ApiResponse)
    }
  },
)

// Get current user
router.get("/me", auth, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "User not authenticated",
      } as ApiResponse)
      return
    }

    res.json({
      success: true,
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        address: req.user.address,
        phone: req.user.phone,
      },
    } as ApiResponse)
  } catch (error: any) {
    console.error("Get user error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    } as ApiResponse)
  }
})

// Update profile
router.put(
  "/profile",
  auth,
  [
    body("name").optional().trim().isLength({ min: 2 }).withMessage("Name must be at least 2 characters"),
    body("phone").optional().isMobilePhone("any").withMessage("Please provide a valid phone number"),
  ],
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: errors.array(),
        } as ApiResponse)
        return
      }

      if (!req.user) {
        res.status(401).json({
          success: false,
          message: "User not authenticated",
        } as ApiResponse)
        return
      }

      const updates = req.body
      const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true, runValidators: true }).select(
        "-password",
      )

      res.json({
        success: true,
        message: "Profile updated successfully",
        user,
      } as ApiResponse)
    } catch (error: any) {
      console.error("Profile update error:", error)
      res.status(500).json({
        success: false,
        message: "Server error during profile update",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      } as ApiResponse)
    }
  },
)

export default router
