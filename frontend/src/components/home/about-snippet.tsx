import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function AboutSnippet() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#fbeee6]/60 via-[#f7e6ef]/40 to-[#e6f0fb]/60">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-5">
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#a31621] mb-2 tracking-tight">Our Story</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                Founded with a passion for timeless elegance and exceptional quality, Luxe Commerce has been curating
                premium products that blend modern sophistication with classic design principles.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg">
                We believe that every purchase should be an experience – from the moment you discover our products to
                the joy of owning something truly special. Our commitment to excellence drives everything we do.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/about">
                <Button variant="outline" className="border-[#a31621] text-[#a31621] hover:bg-[#a31621]/10 font-semibold rounded-full px-6 py-2">
                  Learn More About Us
                </Button>
              </Link>
              <Link href="/contact">
                <Button className="bg-[#a31621] hover:bg-[#a31621]/90 text-white font-semibold rounded-full px-6 py-2 shadow-none">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative w-full h-96 rounded-3xl overflow-hidden border-4 border-[#a31621]/10">
              <Image src="/storyimg.png?height=400&width=600" alt="About Us" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Stats Overlay */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-white/95 backdrop-blur-md rounded-xl p-5 border border-[#a31621]/10">
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-[#a31621]">5+</div>
                    <div className="text-xs text-gray-600">Years Experience</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#a31621]">10K+</div>
                    <div className="text-xs text-gray-600">Happy Customers</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#a31621]">500+</div>
                    <div className="text-xs text-gray-600">Premium Products</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
