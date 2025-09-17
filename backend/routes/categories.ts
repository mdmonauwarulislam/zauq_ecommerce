import express, { type Response } from "express"
import { body, validationResult } from "express-validator"
import Category from "../models/Category"
import { adminAuth } from "../middleware/auth"
import type { AuthRequest, ApiResponse } from "../types"

const router = express.Router()

// Get all categories
router.get("/", async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const categories = await Category.find({ isActive: true }).sort({ name: 1 })

    res.json({
      success: true,
      data: categories,
    } as ApiResponse)
  } catch (error: any) {
    console.error("Get categories error:", error)
    res.status(500).json({
      success: false,
      message: "Server error while fetching categories",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    } as ApiResponse)
  }
})

// Get single category
router.get("/:id", async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const category = await Category.findOne({
      _id: req.params.id,
      isActive: true,
    })

    if (!category) {
      res.status(404).json({
        success: false,
        message: "Category not found",
      } as ApiResponse)
      return
    }

    res.json({
      success: true,
      data: category,
    } as ApiResponse)
  } catch (error: any) {
    console.error("Get category error:", error)
    res.status(500).json({
      success: false,
      message: "Server error while fetching category",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    } as ApiResponse)
  }
})

// Create category (Admin only)
router.post(
  "/",
  adminAuth,
  [
    body("name").trim().isLength({ min: 2 }).withMessage("Category name must be at least 2 characters"),
    body("description").optional().trim(),
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

      const { name, description, image } = req.body

      // Check if category already exists
      const existingCategory = await Category.findOne({
        name: { $regex: new RegExp(`^${name}$`, "i") },
      })

      if (existingCategory) {
        res.status(400).json({
          success: false,
          message: "Category with this name already exists",
        } as ApiResponse)
        return
      }

      const category = new Category({ name, description, image })
      await category.save()

      res.status(201).json({
        success: true,
        message: "Category created successfully",
        data: category,
      } as ApiResponse)
    } catch (error: any) {
      console.error("Create category error:", error)
      res.status(500).json({
        success: false,
        message: "Server error while creating category",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      } as ApiResponse)
    }
  },
)

// Update category (Admin only)
router.put(
  "/:id",
  adminAuth,
  [
    body("name").optional().trim().isLength({ min: 2 }).withMessage("Category name must be at least 2 characters"),
    body("description").optional().trim(),
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

      const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

      if (!category) {
        res.status(404).json({
          success: false,
          message: "Category not found",
        } as ApiResponse)
        return
      }

      res.json({
        success: true,
        message: "Category updated successfully",
        data: category,
      } as ApiResponse)
    } catch (error: any) {
      console.error("Update category error:", error)
      res.status(500).json({
        success: false,
        message: "Server error while updating category",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      } as ApiResponse)
    }
  },
)

// Delete category (Admin only)
router.delete("/:id", adminAuth, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true })

    if (!category) {
      res.status(404).json({
        success: false,
        message: "Category not found",
      } as ApiResponse)
      return
    }

    res.json({
      success: true,
      message: "Category deleted successfully",
    } as ApiResponse)
  } catch (error: any) {
    console.error("Delete category error:", error)
    res.status(500).json({
      success: false,
      message: "Server error while deleting category",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    } as ApiResponse)
  }
})

export default router
