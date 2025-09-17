"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingBag, Star, Eye } from "lucide-react"

// Helper to format INR with commas
const formatINR = (amount: number) => `₹${amount.toLocaleString("en-IN")}`

interface ProductCardProps {
  product: {
    id: string
    name: string
    price: number
    originalPrice?: number
    image: string
    rating: number
    reviews: number
    badge?: string
    category?: string
  }
  variant?: "default" | "compact" | "featured"
  showQuickActions?: boolean
  className?: string
}

export default function ProductCard({ 
  product, 
  variant = "default", 
  showQuickActions = true,
  className = ""
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsWishlisted(!isWishlisted)
  }

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "Sale":
        return "bg-red-500 text-white"
      case "New":
        return "bg-green-500 text-white"
      case "Best Seller":
        return "bg-blue-500 text-white"
      case "Limited":
        return "bg-purple-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getCardClasses = () => {
    const baseClasses = "group cursor-pointer border-0 shadow-sm hover:shadow-xl transition-all duration-500 bg-white overflow-hidden"
    
    switch (variant) {
      case "featured":
        return `${baseClasses} border-b-4 border-[#a31621]/4 rounded-xl hover:scale-[1.03] hover:border-[#a31621]/40 ${className}`
      case "compact":
        return `${baseClasses} rounded-xl hover:scale-105 ${className}`
      default:
        return `${baseClasses} rounded-xl hover:scale-105 ${className}`
    }
  }

  const getImageClasses = () => {
    switch (variant) {
      case "featured":
        return "w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
      case "compact":
        return "w-32 h-32 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
      default:
        return "w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
    }
  }

  const getWishlistButtonClasses = () => {
    const baseClasses = "absolute top-4 right-4 bg-white/95 border border-gray-200/50 hover:bg-red-50 transition-all duration-300 z-10 rounded-full w-10 h-10"
    return baseClasses
  }

  const getQuickActionsClasses = () => {
    switch (variant) {
      case "featured":
        return "absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0"
      default:
        return "absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    }
  }

  const getContentClasses = () => {
    switch (variant) {
      case "featured":
        return "p-6 pb-4 pt-5 min-h-0 border-b-2 border-gray-100"
      case "compact":
        return "p-6 flex-1"
      default:
        return "p-4"
    }
  }

  const getTitleClasses = () => {
    const baseClasses = "font-semibold text-gray-900 hover:text-[#a31621] transition-colors"
    
    switch (variant) {
      case "featured":
        return `${baseClasses} text-lg line-clamp-1 group-hover:scale-105 transform origin-left`
      case "compact":
        return `${baseClasses} text-lg line-clamp-2 mb-2`
      default:
        return `${baseClasses} text-base line-clamp-2`
    }
  }

  const getPriceClasses = () => {
    switch (variant) {
      case "featured":
        return "text-xl font-bold text-[#a31621]"
      case "compact":
        return "text-lg font-bold text-[#a31621]"
      default:
        return "text-lg font-semibold text-[#a31621]"
    }
  }

  // Render compact variant with image on left
  if (variant === "compact") {
    return (
      <Card className={getCardClasses()}>
        <CardContent className="p-0">
          <div className="flex items-center p-6">
            {/* Image on the left */}
            <div className="relative flex-shrink-0 mr-6">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={128}
                height={128}
                className={getImageClasses()}
              />
              
              {/* Badge */}
              {product.badge && (
                <Badge
                  className={`absolute -top-2 -left-2 px-2 py-1 rounded-full text-xs font-semibold border-0 ${getBadgeColor(product.badge)}`}
                >
                  {product.badge}
                </Badge>
              )}

              {/* Wishlist Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 bg-white/95 border border-gray-200/50 hover:bg-red-50 transition-all duration-300 z-10 rounded-full w-8 h-8"
                onClick={toggleWishlist}
              >
                <Heart
                  className={`w-4 h-4 transition-all duration-300 ${
                    isWishlisted 
                      ? "fill-[#a31621] text-[#a31621] scale-110" 
                      : "text-gray-500 group-hover:text-[#a31621] group-hover:scale-110"
                  }`}
                />
              </Button>
            </div>

            {/* Content on the right */}
            <div className={getContentClasses()}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <Link href={`/products/${product.id}`} className="block">
                    <h3 className={getTitleClasses()}>
                      {product.name}
                    </h3>
                  </Link>
                  
                  {/* Rating */}
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating) 
                              ? "fill-yellow-400 text-yellow-400" 
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 font-medium">
                      {product.rating} <span className="text-gray-400">({product.reviews})</span>
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center space-x-3 mb-4">
                    <span className={getPriceClasses()}>
                      {formatINR(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        {formatINR(product.originalPrice)}
                      </span>
                    )}
                    {product.originalPrice && (
                      <span className="px-2 py-1 bg-red-100 text-[#a31621] text-xs rounded-full font-bold border border-red-200">
                        -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions on the right */}
                <div className="flex flex-col items-end space-y-2 ml-4">
                  <Button 
                    size="sm"
                    className="bg-[#a31621] text-white hover:bg-[#a31621]/90"
                  >
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-gray-200 text-gray-600 hover:bg-gray-50"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Quick View
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Render grid variants (default and featured)
  return (
    <Card className={getCardClasses()}>
      <CardContent className="p-0">
        <div className="relative overflow-hidden rounded-t-xl">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={400}
            height={400}
            className={getImageClasses()}
          />

          {/* Badge */}
          {product.badge && (
            <Badge
              className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide border-0 ${getBadgeColor(product.badge)}`}
            >
              {product.badge}
            </Badge>
          )}

          {/* Wishlist Button */}
          <Button
            variant="ghost"
            size="icon"
            className={getWishlistButtonClasses()}
            onClick={toggleWishlist}
          >
            <Heart
              className={`w-5 h-5 transition-all duration-300 ${
                isWishlisted 
                  ? "fill-[#a31621] text-[#a31621] scale-110" 
                  : "text-gray-500 group-hover:text-[#a31621] group-hover:scale-110"
              }`}
            />
          </Button>

          {/* Quick Actions */}
          {showQuickActions && (
            <div className={getQuickActionsClasses()}>
              <Button 
                className={`w-full font-bold rounded-2xl py-3 transition-all duration-300 ${
                  variant === "featured" 
                    ? "bg-[#a31621] text-white hover:bg-[#a31621]/90" 
                    : "bg-white/90 backdrop-blur-sm text-gray-900 hover:bg-white"
                }`}
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          )}
        </div>

        <div className={getContentClasses()}>
          <Link href={`/products/${product.id}`} className="block mb-2">
            <h3 className={getTitleClasses()}>
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center space-x-2 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating) 
                      ? "fill-yellow-400 text-yellow-400" 
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 font-medium">
              {product.rating} <span className="text-gray-400">({product.reviews})</span>
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-3">
            <span className={getPriceClasses()}>
              {formatINR(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                {formatINR(product.originalPrice)}
              </span>
            )}
            {product.originalPrice && (
              <span className="ml-2 px-3 py-1 bg-red-100 text-[#a31621] text-xs rounded-full font-bold border border-red-200">
                -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 