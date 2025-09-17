import express, { type Response } from "express"
import Razorpay from "razorpay"
import crypto from "crypto"
import { body, validationResult } from "express-validator"
import { auth } from "../middleware/auth"
import type { AuthRequest, ApiResponse, RazorpayOrderOptions, RazorpayVerificationData } from "../types"

import dotenv from "dotenv";
dotenv.config();

const router = express.Router()

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "",
})

// Create Razorpay order
router.post(
  "/create-order",
  auth,
  [
    body("amount").isFloat({ min: 1 }).withMessage("Amount must be greater than 0"),
    body("currency").optional().isIn(["INR", "USD"]).withMessage("Invalid currency"),
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

      const { amount, currency = "INR" } = req.body

      const options: RazorpayOrderOptions = {
        amount: Math.round(amount * 100), // Convert to paise
        currency,
        receipt: `receipt_${Date.now()}`,
        payment_capture: 1,
      }

      const order = await razorpay.orders.create(options)

      res.json({
        success: true,
        data: {
          orderId: order.id,
          amount: order.amount,
          currency: order.currency,
          key: process.env.RAZORPAY_KEY_ID,
        },
      } as ApiResponse)
    } catch (error: any) {
      console.error("Create Razorpay order error:", error)
      res.status(500).json({
        success: false,
        message: "Failed to create payment order",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      } as ApiResponse)
    }
  },
)

// Verify Razorpay payment
router.post(
  "/verify",
  auth,
  [
    body("razorpay_order_id").notEmpty().withMessage("Order ID is required"),
    body("razorpay_payment_id").notEmpty().withMessage("Payment ID is required"),
    body("razorpay_signature").notEmpty().withMessage("Signature is required"),
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

      const { razorpay_order_id, razorpay_payment_id, razorpay_signature }: RazorpayVerificationData = req.body

      // Verify signature
      const body = razorpay_order_id + "|" + razorpay_payment_id
      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "")
        .update(body.toString())
        .digest("hex")

      if (expectedSignature !== razorpay_signature) {
        res.status(400).json({
          success: false,
          message: "Invalid payment signature",
        } as ApiResponse)
        return
      }

      // Payment is verified
      res.json({
        success: true,
        message: "Payment verified successfully",
        data: {
          orderId: razorpay_order_id,
          paymentId: razorpay_payment_id,
        },
      } as ApiResponse)
    } catch (error: any) {
      console.error("Verify payment error:", error)
      res.status(500).json({
        success: false,
        message: "Payment verification failed",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      } as ApiResponse)
    }
  },
)

// Get payment details
router.get("/payment/:paymentId", auth, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { paymentId } = req.params

    const payment = await razorpay.payments.fetch(paymentId)

    res.json({
      success: true,
      data: payment,
    } as ApiResponse)
  } catch (error: any) {
    console.error("Get payment details error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to fetch payment details",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    } as ApiResponse)
  }
})

// Refund payment (Admin only)
router.post(
  "/refund",
  auth,
  [
    body("paymentId").notEmpty().withMessage("Payment ID is required"),
    body("amount").optional().isFloat({ min: 1 }).withMessage("Amount must be greater than 0"),
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

      const { paymentId, amount } = req.body

      const refundOptions: any = {
        payment_id: paymentId,
      }

      if (amount) {
        refundOptions.amount = Math.round(amount * 100) // Convert to paise
      }

      const refund = await razorpay.payments.refund(paymentId, refundOptions)

      res.json({
        success: true,
        message: "Refund initiated successfully",
        data: refund,
      } as ApiResponse)
    } catch (error: any) {
      console.error("Refund payment error:", error)
      res.status(500).json({
        success: false,
        message: "Failed to initiate refund",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      } as ApiResponse)
    }
  },
)

export default router
