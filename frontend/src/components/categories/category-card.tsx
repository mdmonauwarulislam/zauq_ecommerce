import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"

interface CategoryCardProps {
  name: string
  description: string
  image: string
  count: number
  href: string
  featured?: boolean
  subcategories?: string[]
  variant?: "grid" | "list"
}

export function CategoryCard({
  name,
  description,
  image,
  count,
  href,
  featured = false,
  subcategories = [],
  variant = "grid",
}: CategoryCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative block overflow-hidden rounded-3xl aspect-[5/2] transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl border border-gray-100/50",
        featured ? "ring-2 ring-[#a31621]/60 shadow-lg" : "",
        variant === "grid" ? "h-full" : "flex"
      )}
    >
      {/* Background Image */}
      <Image
        src={image}
        alt={name}
        fill
        className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
      
      {/* Content Overlay */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-3xl font-bold text-white group-hover:text-[#a31621]/90 transition-colors duration-300">
            {name}
          </h3>
          {featured && (
            <span className="ml-2 inline-block rounded-full bg-[#a31621]/90 px-4 py-2 text-sm font-semibold text-white shadow-lg">
              Featured
            </span>
          )}
        </div>
        
        <p className="text-base text-gray-200 mb-4 line-clamp-2 font-medium opacity-90 leading-relaxed">
          {description}
        </p>
        
        {subcategories && subcategories.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {subcategories.slice(0, 2).map((sub, idx) => (
              <span
                key={idx}
                className="inline-block rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-xs text-white font-medium border border-white/30"
              >
                {sub}
              </span>
            ))}
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-300 font-semibold bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full">
            {count} products
          </span>
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm text-white group-hover:bg-[#a31621] group-hover:text-white transition-all duration-300 group-hover:scale-110">
            <ArrowRight size={20} />
          </span>
        </div>
      </div>
    </Link>
  )
}

// Category data for reuse
export const categoryCardData = [
  {
    name: "Fashion",
    description: "Stylish apparel for all seasons with premium quality and contemporary designs.",
    image: "/fashion.jpg",
    count: 120,
    href: "/categories/fashion",
  },
  {
    name: "Electronics",
    description: "Latest gadgets and accessories with cutting-edge technology and innovation.",
    image: "/electronics.jpg",
    count: 85,
    href: "/categories/electronics",
  },
  {
    name: "Home & Living",
    description: "Modern decor and essentials to transform your living space with elegance.",
    image: "/homeandliving.jpg",
    count: 200,
    href: "/categories/home-living",
  },
  {
    name: "Beauty",
    description: "Premium skincare and cosmetics for your daily beauty and wellness routine.",
    image: "/beauty.png",
    count: 95,
    href: "/categories/beauty",
  },
]

