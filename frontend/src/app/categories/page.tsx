import CategoryHero from "@/components/categories/category-hero"
import { FeaturedCategories } from "@/components/categories/featured-categories"
import { CategoryCard, categoryCardData } from "@/components/categories/category-card"

export default function CategoriesPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#fbeee6] via-[#f7e6ef] to-[#e6f0fb]">
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-24">
        <CategoryHero />
        
        {/* Main Categories Grid */}
        <section className="mt-4 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#a31621] mb-4">
              Explore Our Categories
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto text-lg">
              Discover curated collections designed to elevate your lifestyle
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {categoryCardData.map((category, index) => (
              <div
                key={category.name}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CategoryCard {...category} />
              </div>
            ))}
          </div>
        </section>

        {/* Featured Categories Section */}
        <section className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-[#a31621] mb-4">
              Featured Collections
            </h3>
            <p className="text-gray-700 max-w-xl mx-auto">
              Handpicked items from our most popular categories
            </p>
          </div>
          
          <FeaturedCategories />
        </section>
      </main>
    </div>
  )
}
