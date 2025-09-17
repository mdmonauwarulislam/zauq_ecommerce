"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Grid3X3, List, Filter, Sparkles } from "lucide-react"
import ProductCard from "@/components/ui/product-card"

export default function ProductGrid() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("newest")

  const products = [
    {
      id: "1",
      name: "Minimalist Watch",
      price: 299,
      originalPrice: 399,
      image: "/wacth.webp",
      rating: 4.8,
      reviews: 124,
      badge: "Best Seller",
      category: "Fashion",
    },
    {
      id: "2",
      name: "Elegant Handbag",
      price: 189,
      image: "/placeholder.svg",
      rating: 4.9,
      reviews: 89,
      badge: "New",
      category: "Fashion",
    },
    {
      id: "3",
      name: "Premium Headphones",
      price: 249,
      originalPrice: 299,
      image: "/placeholder.svg",
      rating: 4.7,
      reviews: 156,
      badge: "Sale",
      category: "Electronics",
    },
    {
      id: "4",
      name: "Luxury Perfume",
      price: 129,
      image: "/placeholder.svg",
      rating: 4.6,
      reviews: 78,
      badge: "Limited",
      category: "Beauty",
    },
    {
      id: "5",
      name: "Smart Fitness Tracker",
      price: 199,
      originalPrice: 249,
      image: "/placeholder.svg",
      rating: 4.5,
      reviews: 203,
      badge: "Sale",
      category: "Electronics",
    },
    {
      id: "6",
      name: "Designer Sunglasses",
      price: 159,
      image: "/placeholder.svg",
      rating: 4.7,
      reviews: 92,
      category: "Fashion",
    },
    {
      id: "7",
      name: "Wireless Earbuds",
      price: 179,
      originalPrice: 229,
      image: "/placeholder.svg",
      rating: 4.4,
      reviews: 167,
      badge: "Sale",
      category: "Electronics",
    },
    {
      id: "8",
      name: "Organic Skincare Set",
      price: 89,
      image: "/placeholder.svg",
      rating: 4.8,
      reviews: 234,
      badge: "Best Seller",
      category: "Beauty",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header with beautiful styling and enhanced animations */}
      <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[#a31621]/10 rounded-lg hover:bg-[#a31621]/20 transition-colors duration-200">
              <Sparkles className="w-6 h-6 text-[#a31621] animate-pulse" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 hover:text-[#a31621] transition-colors duration-200">Discover Our Collection</h2>
              <p className="text-gray-600">Showing {products.length} premium products</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Sort with enhanced styling */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48 bg-white border-gray-200 hover:border-[#a31621]/50 focus:border-[#a31621] transition-colors duration-200">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectContent>
            </Select>

            {/* Filter Button with hover effects */}
            <Button 
              variant="outline" 
              className="border-gray-200 bg-white hover:border-[#a31621] hover:bg-[#a31621]/5 transition-all duration-200 group"
            >
              <Filter className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
              Filters
            </Button>

            {/* View Mode with enhanced interactions */}
            <div className="flex items-center border border-gray-200 rounded-lg bg-white hover:border-[#a31621]/50 transition-colors duration-200">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={`rounded-r-none transition-all duration-200 ${
                  viewMode === "grid" 
                    ? "bg-[#a31621] text-white hover:bg-[#a31621]/90" 
                    : "hover:bg-gray-50 hover:text-[#a31621]"
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={`rounded-l-none transition-all duration-200 ${
                  viewMode === "list" 
                    ? "bg-[#a31621] text-white hover:bg-[#a31621]/90" 
                    : "hover:bg-gray-50 hover:text-[#a31621]"
                }`}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid with staggered animations */}
      <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" : "space-y-4"}>
        {products.map((product, index) => (
          <div
            key={product.id}
            className="animate-in slide-in-from-bottom-4 duration-500"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <ProductCard
              product={product}
              variant={viewMode === "list" ? "compact" : "featured"}
              showQuickActions={viewMode === "grid"}
            />
          </div>
        ))}
      </div>

      {/* Enhanced Pagination */}
      <div className="flex items-center justify-center space-x-2 pt-8">
        <Button 
          variant="outline" 
          disabled 
          className="border-gray-200 hover:border-[#a31621] transition-colors duration-200"
        >
          Previous
        </Button>
        <Button 
          variant="default" 
          className="bg-[#a31621] text-white hover:bg-[#a31621]/90 transition-all duration-200 hover:scale-105"
        >
          1
        </Button>
        <Button 
          variant="outline" 
          className="border-gray-200 hover:border-[#a31621] hover:bg-[#a31621]/5 transition-all duration-200"
        >
          2
        </Button>
        <Button 
          variant="outline" 
          className="border-gray-200 hover:border-[#a31621] hover:bg-[#a31621]/5 transition-all duration-200"
        >
          3
        </Button>
        <Button 
          variant="outline" 
          className="border-gray-200 hover:border-[#a31621] hover:bg-[#a31621]/5 transition-all duration-200"
        >
          Next
        </Button>
      </div>
    </div>
  )
}
