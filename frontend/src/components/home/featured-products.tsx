"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import ProductCard from "@/components/ui/product-card"

export default function FeaturedProducts() {
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
    },
    {
      id: "2",
      name: "Elegant Handbag",
      price: 189,
      image: "/placeholder.svg",
      rating: 4.9,
      reviews: 89,
      badge: "New",
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
    },
    {
      id: "4",
      name: "Luxury Perfume",
      price: 129,
      image: "/placeholder.svg",
      rating: 4.6,
      reviews: 78,
      badge: "Limited",
    },
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <Sparkles className="w-6 h-6 text-[#a31621]" />
            <h2 className="text-4xl md:text-5xl font-bold text-[#a31621]">
              Featured Products
            </h2>
            <Sparkles className="w-6 h-6 text-[#a31621]" />
          </div>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
            Discover our handpicked selection of premium products, chosen for their exceptional quality and timeless
            appeal. Each item tells a story of craftsmanship and elegance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              variant="featured"
              showQuickActions={true}
            />
          ))}
        </div>

        <div className="text-center mt-16">
          <Link href="/products">
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-[#a31621] text-[#a31621] hover:bg-[#a31621] hover:text-white font-bold rounded-full px-10 py-4 transition-all duration-300 text-lg"
            >
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
