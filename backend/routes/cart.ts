import express, { type Response } from "express"
import { body, validationResult } from "express-validator"
import Cart from "../models/Cart"
import Product from "../models/Product"
import { auth } from "../middleware/auth"
import type { AuthRequest, ApiResponse } from "../types"

const router = express.Router()

// Get user's cart
router.get("/", auth, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "User not authenticated",
      } as ApiResponse)
      return
    }

    let cart = await Cart.findOne({ user: req.user._id }).populate("items.product", "name price images stock isActive")

    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] })
      await cart.save()
    }

    // Filter out inactive products
    cart.items = cart.items.filter((item: any) => item.product && item.product.isActive)
    await cart.save()

    res.json({
      success: true,
      data: cart,
    } as ApiResponse)
  } catch (error: any) {
    console.error("Get cart error:", error)
    res.status(500).json({
      success: false,
      message: "Server error while fetching cart",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    } as ApiResponse)
  }
})

// Add item to cart
router.post(
  "/add",
  auth,
  [
    body("productId").isMongoId().withMessage("Invalid product ID"),
    body("quantity").isInt({ min: 1 }).withMessage("Quantity must be at least 1"),
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

      const { productId, quantity } = req.body

      // Check if product exists and is active
      const product = await Product.findOne({ _id: productId, isActive: true })
      if (!product) {
        res.status(404).json({
          success: false,
          message: "Product not found or inactive",
        } as ApiResponse)
        return
      }

      // Check stock availability
      if (product.stock < quantity) {
        res.status(400).json({
          success: false,
          message: `Only ${product.stock} items available in stock`,
        } as ApiResponse)
        return
      }

      // Find or create cart
      let cart = await Cart.findOne({ user: req.user._id })
      if (!cart) {
        cart = new Cart({ user: req.user._id, items: [] })
      }

      // Check if item already exists in cart
      const existingItemIndex = cart.items.findIndex((item: any) => item.product.toString() === productId)

      if (existingItemIndex > -1) {
        // Update quantity
        const newQuantity = cart.items[existingItemIndex].quantity + quantity

        if (product.stock < newQuantity) {
          res.status(400).json({
            success: false,
            message: `Only ${product.stock} items available in stock`,
          } as ApiResponse)
          return
        }

        cart.items[existingItemIndex].quantity = newQuantity
      } else {
        // Add new item
        cart.items.push({
          product: productId,
          quantity,
          price: product.price,
        })
      }

      await cart.save()
      await cart.populate("items.product", "name price images stock isActive")

      res.json({
        success: true,
        message: "Item added to cart successfully",
        data: cart,
      } as ApiResponse)
    } catch (error: any) {
      console.error("Add to cart error:", error)
      res.status(500).json({
        success: false,
        message: "Server error while adding item to cart",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      } as ApiResponse)
    }
  },
)

// Update cart item quantity
router.put(
  "/update",
  auth,
  [
    body("productId").isMongoId().withMessage("Invalid product ID"),
    body("quantity").isInt({ min: 0 }).withMessage("Quantity must be non-negative"),
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

      const { productId, quantity } = req.body

      const cart = await Cart.findOne({ user: req.user._id })
      if (!cart) {
        res.status(404).json({
          success: false,
          message: "Cart not found",
        } as ApiResponse)
        return
      }

      const itemIndex = cart.items.findIndex((item: any) => item.product.toString() === productId)

      if (itemIndex === -1) {
        res.status(404).json({
          success: false,
          message: "Item not found in cart",
        } as ApiResponse)
        return
      }

      if (quantity === 0) {
        // Remove item from cart
        cart.items.splice(itemIndex, 1)
      } else {
        // Check stock availability
        const product = await Product.findById(productId)
        if (!product || product.stock < quantity) {
          res.status(400).json({
            success: false,
            message: `Only ${product?.stock || 0} items available in stock`,
          } as ApiResponse)
          return
        }

        // Update quantity
        cart.items[itemIndex].quantity = quantity
      }

      await cart.save()
      await cart.populate("items.product", "name price images stock isActive")

      res.json({
        success: true,
        message: "Cart updated successfully",
        data: cart,
      } as ApiResponse)
    } catch (error: any) {
      console.error("Update cart error:", error)
      res.status(500).json({
        success: false,
        message: "Server error while updating cart",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      } as ApiResponse)
    }
  },
)

// Remove item from cart
router.delete("/remove/:productId", auth, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "User not authenticated",
      } as ApiResponse)
      return
    }

    const { productId } = req.params

    const cart = await Cart.findOne({ user: req.user._id })
    if (!cart) {
      res.status(404).json({
        success: false,
        message: "Cart not found",
      } as ApiResponse)
      return
    }

    cart.items = cart.items.filter((item: any) => item.product.toString() !== productId)

    await cart.save()
    await cart.populate("items.product", "name price images stock isActive")

    res.json({
      success: true,
      message: "Item removed from cart successfully",
      data: cart,
    } as ApiResponse)
  } catch (error: any) {
    console.error("Remove from cart error:", error)
    res.status(500).json({
      success: false,
      message: "Server error while removing item from cart",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    } as ApiResponse)
  }
})

// Clear cart
router.delete("/clear", auth, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "User not authenticated",
      } as ApiResponse)
      return
    }

    const cart = await Cart.findOne({ user: req.user._id })
    if (!cart) {
      res.status(404).json({
        success: false,
        message: "Cart not found",
      } as ApiResponse)
      return
    }

    cart.items = []
    await cart.save()

    res.json({
      success: true,
      message: "Cart cleared successfully",
      data: cart,
    } as ApiResponse)
  } catch (error: any) {
    console.error("Clear cart error:", error)
    res.status(500).json({
      success: false,
      message: "Server error while clearing cart",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    } as ApiResponse)
  }
})

export default router
