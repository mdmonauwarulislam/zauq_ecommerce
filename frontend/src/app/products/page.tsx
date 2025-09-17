
import ProductFilters from "@/components/products/product-filters"
import ProductGrid from "@/components/products/product-grid"
import { Sparkles, ShoppingBag, Star, TrendingUp } from "lucide-react"

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <main className="pt-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#a31621] to-[#c41e3a] text-white py-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-3 mb-6">
                <Sparkles className="w-8 h-8" />
                <h1 className="text-5xl md:text-6xl font-bold">
                  Discover Our Collection
                </h1>
                <Sparkles className="w-8 h-8" />
              </div>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                Explore our curated selection of premium products, each chosen for quality, style, and exceptional value. 
                Find your perfect match from our extensive collection.
              </p>
              
              {/* Stats */}
              <div className="flex justify-center items-center gap-8 mt-12">
                <div className="text-center">
                  <div className="text-3xl font-bold">500+</div>
                  <div className="text-white/80">Products</div>
                </div>
                <div className="w-px h-12 bg-white/20"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold">4.8★</div>
                  <div className="text-white/80">Average Rating</div>
                </div>
                <div className="w-px h-12 bg-white/20"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold">50K+</div>
                  <div className="text-white/80">Happy Customers</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
            <span>Home</span>
            <span>/</span>
            <span className="text-[#a31621] font-medium">Products</span>
          </div>

          {/* Filters and Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Filters */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <TrendingUp className="w-5 h-5 text-[#a31621]" />
                    <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                  </div>
                  <ProductFilters />
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="lg:col-span-3">
              <ProductGrid />
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-r from-gray-50 to-white rounded-3xl p-12 border border-gray-100">
              <div className="max-w-2xl mx-auto">
                <ShoppingBag className="w-16 h-16 text-[#a31621] mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Can't Find What You're Looking For?
                </h2>
                <p className="text-gray-600 text-lg mb-8">
                  Our customer service team is here to help you find the perfect product. 
                  Get in touch with us for personalized recommendations.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-[#a31621] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#a31621]/90 transition-colors">
                    Contact Support
                  </button>
                  <button className="border-2 border-[#a31621] text-[#a31621] px-8 py-3 rounded-full font-semibold hover:bg-[#a31621] hover:text-white transition-colors">
                    Browse Categories
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
