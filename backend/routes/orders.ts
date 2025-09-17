import express, { type Response } from "express"
import { body, validationResult } from "express-validator"
import Order from "../models/Order"
import Cart from "../models/Cart"
import Product from "../models/Product"
import { auth, adminAuth } from "../middleware/auth"
import type { AuthRequest, ApiResponse, PaginationResult } from "../types"

const router = express.Router()

// Get user's orders
router.get("/", auth, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "User not authenticated",
      } as ApiResponse)
      return
    }

    const page = Number.parseInt(req.query.page as string) || 1
    const limit = Number.parseInt(req.query.limit as string) || 10
    const skip = (page - 1) * limit

    const orders = await Order.find({ user: req.user._id })
      .populate("items.product", "name images")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    const total = await Order.countDocuments({ user: req.user._id })

    const pagination: PaginationResult = {
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      hasNext: page < Math.ceil(total / limit),
      hasPrev: page > 1,
    }

    res.json({
      success: true,
      data: {
        orders,
        pagination,
      },
    } as ApiResponse)
  } catch (error: any) {
    console.error("Get orders error:", error)
    res.status(500).json({
      success: false,
      message: "Server error while fetching orders",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    } as ApiResponse)
  }
})

// Get single order
router.get("/:id", auth, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "User not authenticated",
      } as ApiResponse)
      return
    }

    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user._id,
    }).populate("items.product", "name images")

    if (!order) {
      res.status(404).json({
        success: false,
        message: "Order not found",
      } as ApiResponse)
      return
    }

    res.json({
      success: true,
      data: order,
    } as ApiResponse)
  } catch (error: any) {
    console.error("Get order error:", error)
    res.status(500).json({
      success: false,
      message: "Server error while fetching order",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    } as ApiResponse)
  }
})

// Create order
router.post(
  "/",
  auth,
  [
    body("paymentMethod").isIn(["razorpay", "cod"]).withMessage("Invalid payment method"),
    body("shippingAddress.name").trim().isLength({ min: 2 }).withMessage("Name is required"),
    body("shippingAddress.street").trim().isLength({ min: 5 }).withMessage("Street address is required"),
    body("shippingAddress.city").trim().isLength({ min: 2 }).withMessage("City is required"),
    body("shippingAddress.state").trim().isLength({ min: 2 }).withMessage("State is required"),
    body("shippingAddress.zipCode").trim().isLength({ min: 5 }).withMessage("Valid zip code is required"),
    body("shippingAddress.country").trim().isLength({ min: 2 }).withMessage("Country is required"),
    body("shippingAddress.phone").trim().isLength({ min: 10 }).withMessage("Valid phone number is required"),
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

      const { paymentMethod, shippingAddress, paymentId } = req.body

      // Get user's cart
      const cart = await Cart.findOne({ user: req.user._id }).populate("items.product", "name price images stock")

      if (!cart || cart.items.length === 0) {
        res.status(400).json({
          success: false,
          message: "Cart is empty",
        } as ApiResponse)
        return
      }

      // Verify stock availability
      for (const item of cart.items) {
        const product = item.product as any
        if (product.stock < item.quantity) {
          res.status(400).json({
            success: false,
            message: `Insufficient stock for ${product.name}`,
          } as ApiResponse)
          return
        }
      }

      // Create order items
      const orderItems = cart.items.map((item: any) => ({
        product: item.product._id,
        name: item.product.name,
        price: item.price,
        quantity: item.quantity,
        image: item.product.images[0] || "",
      }))

      // Create order
      const order = new Order({
        user: req.user._id,
        items: orderItems,
        totalAmount: cart.totalAmount,
        paymentMethod,
        shippingAddress,
        paymentId: paymentId || undefined,
        paymentStatus: paymentMethod === "cod" ? "pending" : "completed",
      })

      await order.save()

      // Update product stock
      for (const item of cart.items) {
        await Product.findByIdAndUpdate((item.product as any)._id, { $inc: { stock: -item.quantity } })
      }

      // Clear cart
      cart.items = []
      await cart.save()

      await order.populate("items.product", "name images")

      res.status(201).json({
        success: true,
        message: "Order created successfully",
        data: order,
      } as ApiResponse)
    } catch (error: any) {
      console.error("Create order error:", error)
      res.status(500).json({
        success: false,
        message: "Server error while creating order",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      } as ApiResponse)
    }
  },
)

// Cancel order
router.put("/:id/cancel", auth, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "User not authenticated",
      } as ApiResponse)
      return
    }

    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user._id,
    })

    if (!order) {
      res.status(404).json({
        success: false,
        message: "Order not found",
      } as ApiResponse)
      return
    }

    if (order.status !== "pending" && order.status !== "confirmed") {
      res.status(400).json({
        success: false,
        message: "Order cannot be cancelled at this stage",
      } as ApiResponse)
      return
    }

    order.status = "cancelled"
    await order.save()

    // Restore product stock
    for (const item of order.items) {
      await Product.findByIdAndUpdate(item.product, { $inc: { stock: item.quantity } })
    }

    res.json({
      success: true,
      message: "Order cancelled successfully",
      data: order,
    } as ApiResponse)
  } catch (error: any) {
    console.error("Cancel order error:", error)
    res.status(500).json({
      success: false,
      message: "Server error while cancelling order",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    } as ApiResponse)
  }
})

// Admin: Get all orders
router.get("/admin/all", adminAuth, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const page = Number.parseInt(req.query.page as string) || 1
    const limit = Number.parseInt(req.query.limit as string) || 20
    const skip = (page - 1) * limit

    const filter: any = {}
    if (req.query.status) {
      filter.status = req.query.status
    }

    const orders = await Order.find(filter)
      .populate("user", "name email")
      .populate("items.product", "name images")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    const total = await Order.countDocuments(filter)

    const pagination: PaginationResult = {
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      hasNext: page < Math.ceil(total / limit),
      hasPrev: page > 1,
    }

    res.json({
      success: true,
      data: {
        orders,
        pagination,
      },
    } as ApiResponse)
  } catch (error: any) {
    console.error("Get all orders error:", error)
    res.status(500).json({
      success: false,
      message: "Server error while fetching orders",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    } as ApiResponse)
  }
})

// Admin: Update order status
router.put(
  "/:id/status",
  adminAuth,
  [
    body("status")
      .isIn(["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"])
      .withMessage("Invalid status"),
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

      const { status } = req.body

      const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true })
        .populate("user", "name email")
        .populate("items.product", "name images")

      if (!order) {
        res.status(404).json({
          success: false,
          message: "Order not found",
        } as ApiResponse)
        return
      }

      res.json({
        success: true,
        message: "Order status updated successfully",
        data: order,
      } as ApiResponse)
    } catch (error: any) {
      console.error("Update order status error:", error)
      res.status(500).json({
        success: false,
        message: "Server error while updating order status",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      } as ApiResponse)
    }
  },
)

export default router
