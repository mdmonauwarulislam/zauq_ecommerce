
import HeroSection from "@/components/home/hero-section"
import { FeaturedCategories } from "@/components/categories/featured-categories"
import FeaturedProducts from "@/components/home/featured-products"
import PromotionalBanner from "@/components/home/promotional-banner"
import AboutSnippet from "@/components/home/about-snippet"

export default function HomePage() {
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Soft gradient background with faint radial highlight */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#fbeee6] via-[#f7e6ef] to-[#e6f0fb]">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[120vw] h-[80vh] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#fff7f7]/80 via-[#fbeee6]/40 to-transparent opacity-80" />
      </div>
      <main className="container mx-auto px-2 sm:px-4 pt-10">
        <section className="">
          <HeroSection />
        </section>
        <section className="">
          <div>
            <div className="text-center mb-14">
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#a31621] mb-4 tracking-tight">
                Shop by Category
              </h2>
              <p className="text-gray-700 max-w-2xl mx-auto text-lg">
                Explore our carefully curated categories, each featuring premium
                products selected for their quality and style.
              </p>
            </div>
          </div>
          <FeaturedCategories />
        </section>
        <section className="">

          <FeaturedProducts />
        </section>
        <section className="">
          <PromotionalBanner />
        </section>
        <section className="">
          <AboutSnippet />
        </section>
      </main>
    </div>
  )
}
