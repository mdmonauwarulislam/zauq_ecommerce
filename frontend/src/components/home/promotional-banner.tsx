import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Gift, Truck, Shield, Headphones } from "lucide-react"

export default function PromotionalBanner() {
  const features = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "On orders over $100",
    },
    {
      icon: Shield,
      title: "Secure Payment",
      description: "100% protected checkout",
    },
    {
      icon: Gift,
      title: "Easy Returns",
      description: "30-day return policy",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Dedicated customer service",
    },
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Main Promotional Banner */}
        <div className="relative rounded-3xl overflow-hidden mb-12 bg-gradient-to-br from-[#fbeee6] via-[#f7e6ef] to-[#e6f0fb] p-10 md:p-16 text-center border-b-4 border-[#a31621]/10">
          <div className="relative z-10 flex flex-col items-center justify-center animate-fadeIn">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#a31621] mb-4 tracking-tight">Special Offer</h2>
            <p className="text-[#a31621] text-lg md:text-xl font-medium mb-8 max-w-2xl mx-auto">
              Get <span className="font-bold text-2xl text-[#a31621]">20% off</span> on your first order. Use code <span className="bg-[#a31621]/10 px-2 py-1 rounded font-semibold tracking-wider">WELCOME20</span> at checkout.<br className="hidden md:block" /> Limited time offer on selected premium products.
            </p>
            <Link href="/products">
              <Button size="lg" className="border-2 border-[#a31621] text-[#a31621] font-bold rounded-full px-8 py-3 bg-white/80 hover:bg-[#a31621] hover:text-white transition-colors duration-200 animate-fadeIn">
                Shop Now
              </Button>
            </Link>
          </div>
          {/* Soft overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-white/40 to-white/60 pointer-events-none" />
        </div>

        {/* Enhanced Divider */}
        <div className="w-full h-8 flex items-center justify-center mb-6">
          <div className="w-1/4 h-1 rounded-full bg-gradient-to-r from-transparent via-[#a31621]/20 to-transparent" />
          <div className="w-2 h-2 bg-[#a31621] rounded-full mx-4" />
          <div className="w-1/4 h-1 rounded-full bg-gradient-to-r from-transparent via-[#a31621]/20 to-transparent" />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-8 rounded-2xl bg-[#fbeee6]/40 border border-[#a31621] border-t-4 border-t-[#a31621] transition-transform duration-200 hover:bg-[#fbeee6]/70 hover:-translate-y-1 group"
            >
              <div className="w-16 h-16 bg-white border-2 border-[#a31621] rounded-3xl flex items-center justify-center mx-auto mb-5">
                <feature.icon className="w-9 h-9 text-[#a31621]" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-1">{feature.title}</h3>
              <p className="text-sm text-gray-600 font-medium">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
