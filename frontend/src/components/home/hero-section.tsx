import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"


export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* Background */}
      <div className="absolute inset-0 gradient-bg opacity-10" />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-10 animate-fade-in">
            <div className="space-y-5">
              <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight drop-shadow-md">
                Discover
                <span className="block font-extrabold text-[#a31621] drop-shadow-lg">
                  Timeless Elegance
                </span>
              </h1>
              <p className="text-xl text-gray-700 max-w-lg leading-relaxed">
                Curated collection of premium products that blend modern sophistication with timeless design. Experience
                luxury in every detail.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products">
                <Button
                  size="lg"
                  className="border-2 border-[#a31621] text-[#a31621] font-bold rounded-full px-8 py-3 bg-white/80 hover:bg-[#a31621] hover:text-white transition-colors duration-200 shadow-none"
                >
                  Shop Collection
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-[#a31621] text-[#a31621] font-bold rounded-full px-8 py-3 hover:bg-[#a31621]/10 bg-transparent shadow-none"
                >
                  Learn More
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex space-x-10 pt-10">
              <div className="text-center">
                <div className="text-3xl font-extrabold text-[#a31621]">10K+</div>
                <div className="text-base text-gray-600">Happy Customers</div>
              </div>
              <div className="w-px bg-[#a31621]/20 mx-2" />
              <div className="text-center">
                <div className="text-3xl font-extrabold text-[#a31621]">500+</div>
                <div className="text-base text-gray-600">Premium Products</div>
              </div>
              <div className="w-px bg-[#a31621]/20 mx-2" />
              <div className="text-center">
                <div className="text-3xl font-extrabold text-[#a31621]">99%</div>
                <div className="text-base text-gray-600">Satisfaction Rate</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-fade-in">
            <div className="relative w-full h-96 lg:h-[600px] rounded-3xl overflow-hidden border-4 border-[#a31621]/10">
              <Image
                src="/hero1.png"
                alt="Hero Product"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            {/* Floating Cards */}
            <div className="absolute -top-6 -left-6 bg-white/80 rounded-2xl px-5 py-3 shadow-xl backdrop-blur-md border border-[#a31621]/40 flex items-center space-x-4 animate-fade-in">
              <div className="w-14 h-14 bg-[#a31621]/10 rounded-xl flex items-center justify-center">
                <span className="text-[#a31621] font-extrabold text-xl">4.9</span>
              </div>
              <div>
                <div className="font-bold text-gray-900">Excellent</div>
                <div className="text-sm text-gray-600">Customer Rating</div>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 bg-white/80 rounded-2xl px-5 py-3 shadow-xl backdrop-blur-md border border-[#a31621]/40 flex items-center space-x-4 animate-fade-in">
              <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center">
                <span className="text-orange-600 font-extrabold text-xl">24h</span>
              </div>
              <div>
                <div className="font-bold text-gray-900">Fast Delivery</div>
                <div className="text-sm text-gray-600">Free Shipping</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
