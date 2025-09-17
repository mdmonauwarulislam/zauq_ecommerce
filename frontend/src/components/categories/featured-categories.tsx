"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

export function FeaturedCategories() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const categories = [
    {
      name: "Fashion",
      description: "Stylish apparel for all seasons.",
      image: "/fashion.jpg",
      count: "120+ items",
      href: "/categories/fashion",
    },
    {
      name: "Electronics",
      description: "Latest gadgets and accessories.",
      image: "/electronics.jpg",
      count: "85+ items",
      href: "/categories/electronics",
    },
    {
      name: "Home & Living",
      description: "Modern decor and essentials.",
      image: "/homeandliving.jpg?height=300&width=300",
      count: "200+ items",
      href: "/categories/home-living",
    },
    {
      name: "Beauty",
      description: "Premium skincare and cosmetics.",
      image: "/beauty.png?height=300&width=300",
      count: "95+ items",
      href: "/categories/beauty",
    },
  ];

  return (
    <section className="">
      
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-12">
          {categories.map((category, index) => (
            <div
              key={category.name}
              className={`group relative overflow-hidden rounded-2xl border border-[#a31621]/20 bg-white/80 transition-all duration-300 hover:border-[#a31621] hover:shadow-lg hover:-translate-y-2 animate-fade-in`}
              style={{ animationDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Full overlay link for accessibility */}
              <Link href={category.href} className="absolute inset-0 z-10">
                <span className="sr-only">View {category.name}</span>
              </Link>

              <Card className="border-0 bg-transparent shadow-none h-full">
                <CardContent className="p-0">
                  <div className="relative h-[300px] w-full overflow-hidden rounded-t-2xl">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#a31621]/60 via-black/30 to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 p-7 text-white">
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="text-2xl font-bold tracking-tight drop-shadow-sm">
                          {category.name}
                        </h3>
                        <span className="bg-[#a31621]/80 px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                          {category.count}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-white/90">
                        {category.description}
                      </p>

                      <div
                        className={`mt-4 h-1 rounded-full bg-white/80 transition-all duration-300 ${
                          hoveredIndex === index ? "w-full bg-[#a31621]" : "w-12"
                        }`}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
 
    </section>
  );
}
