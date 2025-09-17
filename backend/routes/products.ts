import express, { type Response } from "express"
import { body, validationResult, query } from "express-validator"
import Product from "../models/Product"
import Category from "../models/Category"
import { adminAuth } from "../middleware/auth"
import type { AuthRequest, ApiResponse, ProductQuery, PaginationResult } from "../types"

const router = express.Router()

// Get all products with filtering and pagination
router.get(
  "/",
  [
    query("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer"),
    query("limit").optional().isInt({ min: 1, max: 100 }).withMessage("Limit must be between 1 and 100"),
    query("category").optional().isMongoId().withMessage("Invalid category ID"),
    query("minPrice").optional().isFloat({ min: 0 }).withMessage("Min price must be a positive number"),
    query("maxPrice").optional().isFloat({ min: 0 }).withMessage("Max price must be a positive number"),
    query("search").optional().isLength({ min: 1 }).withMessage("Search term cannot be empty"),
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

      const {
        page = "1",
        limit = "12",
        category,
        minPrice,
        maxPrice,
        search,
        featured,
        sort = "-createdAt",
      } = req.query as ProductQuery

      const pageNum = Number.parseInt(page)
      const limitNum = Number.parseInt(limit)
      const skip = (pageNum - 1) * limitNum

      // Build filter object
      const filter: any = { isActive: true }

      if (category) {
        filter.category = category
      }

      if (minPrice || maxPrice) {
        filter.price = {}
        if (minPrice) filter.price.$gte = Number.parseFloat(minPrice)
        if (maxPrice) filter.price.$lte = Number.parseFloat(maxPrice)
      }

      if (search) {
        filter.$text = { $search: search }
      }

      if (featured === "true") {
        filter.featured = true
      }

      // Get products with pagination
      const products = await Product.find(filter).populate("category", "name").sort(sort).skip(skip).limit(limitNum)

      const total = await Product.countDocuments(filter)

      const pagination: PaginationResult = {
        currentPage: pageNum,
        totalPages: Math.ceil(total / limitNum),
        totalItems: total,
        hasNext: pageNum < Math.ceil(total / limitNum),
        hasPrev: pageNum > 1,
      }

      res.json({
        success: true,
        data: {
          products,
          pagination,
        },
      } as ApiResponse)
    } catch (error: any) {
      console.error("Get products error:", error)
      res.status(500).json({
        success: false,
        message: "Server error while fetching products",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      } as ApiResponse)
    }
  },
)

// Get single product
router.get("/:id", async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      isActive: true,
    }).populate("category", "name description")

    if (!product) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      } as ApiResponse)
      return
    }

    res.json({
      success: true,
      data: product,
    } as ApiResponse)
  } catch (error: any) {
    console.error("Get product error:", error)
    res.status(500).json({
      success: false,
      message: "Server error while fetching product",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    } as ApiResponse)
  }
})

// Create product (Admin only)
router.post(
  "/",
  adminAuth,
  [
    body("name").trim().isLength({ min: 2 }).withMessage("Product name must be at least 2 characters"),
    body("description").trim().isLength({ min: 10 }).withMessage("Description must be at least 10 characters"),
    body("price").isFloat({ min: 0 }).withMessage("Price must be a positive number"),
    body("category").isMongoId().withMessage("Invalid category ID"),
    body("stock").isInt({ min: 0 }).withMessage("Stock must be a non-negative integer"),
    body("sku").trim().isLength({ min: 1 }).withMessage("SKU is required"),
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

      // Check if category exists
      const category = await Category.findById(req.body.category)
      if (!category) {
        res.status(400).json({
          success: false,
          message: "Category not found",
        } as ApiResponse)
        return
      }

      // Check if SKU already exists
      const existingProduct = await Product.findOne({ sku: req.body.sku.toUpperCase() })
      if (existingProduct) {
        res.status(400).json({
          success: false,
          message: "Product with this SKU already exists",
        } as ApiResponse)
        return
      }

      const product = new Product({
        ...req.body,
        sku: req.body.sku.toUpperCase(),
      })
      await product.save()
      await product.populate("category", "name")

      res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: product,
      } as ApiResponse)
    } catch (error: any) {
      console.error("Create product error:", error)
      res.status(500).json({
        success: false,
        message: "Server error while creating product",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      } as ApiResponse)
    }
  },
)

// Update product (Admin only)
router.put("/:id", adminAuth, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("category", "name")

    if (!product) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      } as ApiResponse)
      return
    }

    res.json({
      success: true,
      message: "Product updated successfully",
      data: product,
    } as ApiResponse)
  } catch (error: any) {
    console.error("Update product error:", error)
    res.status(500).json({
      success: false,
      message: "Server error while updating product",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    } as ApiResponse)
  }
})

// Delete product (Admin only)
router.delete("/:id", adminAuth, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true })

    if (!product) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      } as ApiResponse)
      return
    }

    res.json({
      success: true,
      message: "Product deleted successfully",
    } as ApiResponse)
  } catch (error: any) {
    console.error("Delete product error:", error)
    res.status(500).json({
      success: false,
      message: "Server error while deleting product",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    } as ApiResponse)
  }
})

export default router
