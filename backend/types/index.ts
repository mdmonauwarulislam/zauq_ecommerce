import type { Request } from "express"
import type { Document, Types } from "mongoose"

// User Types
export interface IUser extends Document {
  _id: Types.ObjectId
  name: string
  email: string
  password: string
  role: "user" | "admin"
  address?: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  phone?: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  comparePassword(candidatePassword: string): Promise<boolean>
}

// Category Types
export interface ICategory extends Document {
  _id: Types.ObjectId
  name: string
  description?: string
  image?: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

// Product Types
export interface IProduct extends Document {
  _id: Types.ObjectId
  name: string
  description: string
  price: number
  originalPrice?: number
  category: Types.ObjectId | ICategory
  images: string[]
  stock: number
  sku: string
  specifications?: Map<string, string>
  tags: string[]
  isActive: boolean
  featured: boolean
  rating: {
    average: number
    count: number
  }
  createdAt: Date
  updatedAt: Date
}

// Cart Types
export interface ICartItem {
  product: Types.ObjectId | IProduct
  quantity: number
  price: number
}

export interface ICart extends Document {
  _id: Types.ObjectId
  user: Types.ObjectId | IUser
  items: ICartItem[]
  totalAmount: number
  createdAt: Date
  updatedAt: Date
}

// Order Types
export interface IOrderItem {
  product: Types.ObjectId | IProduct
  name: string
  price: number
  quantity: number
  image: string
}

export interface IOrder extends Document {
  _id: Types.ObjectId
  user: Types.ObjectId | IUser
  items: IOrderItem[]
  totalAmount: number
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled"
  paymentStatus: "pending" | "completed" | "failed" | "refunded"
  paymentMethod: "razorpay" | "cod"
  paymentId?: string
  shippingAddress: {
    name: string
    street: string
    city: string
    state: string
    zipCode: string
    country: string
    phone: string
  }
  orderNumber: string
  createdAt: Date
  updatedAt: Date
}

// Request Types
export interface AuthRequest extends Request {
  user?: IUser
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean
  message?: string
  data?: T
  errors?: any[]
}

// Pagination Types
export interface PaginationQuery {
  page?: string
  limit?: string
}

export interface PaginationResult {
  currentPage: number
  totalPages: number
  totalItems: number
  hasNext: boolean
  hasPrev: boolean
}

// Product Query Types
export interface ProductQuery extends PaginationQuery {
  category?: string
  minPrice?: string
  maxPrice?: string
  search?: string
  featured?: string
  sort?: string
}

// JWT Payload Types
export interface JWTPayload {
  userId: string
  iat?: number
  exp?: number
}

// Razorpay Types
export interface RazorpayOrderOptions {
  amount: number
  currency: string
  receipt: string
  payment_capture: number
}

export interface RazorpayVerificationData {
  razorpay_order_id: string
  razorpay_payment_id: string
  razorpay_signature: string
}
