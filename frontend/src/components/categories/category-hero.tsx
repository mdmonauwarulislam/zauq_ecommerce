export default function CategoryHero() {
  return (
    <section className="relative py-16 lg:py-24 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#fbeee6]/50 via-transparent to-[#f7e6ef]/50" />
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#a31621]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#a31621]/5 rounded-full blur-3xl" />
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <div className="mb-4">
          <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
            Shop by
            <span className=" text-[#a31621] ml-2">Category</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Explore our carefully curated categories, each featuring premium
            products selected for their quality, style, and innovation.
          </p>
        </div>
        
        {/* Decorative line */}
        <div className="w-24 h-1 bg-gradient-to-r from-[#a31621] to-[#a31621]/70 mx-auto rounded-full" />
      </div>
    </section>
  )
}
