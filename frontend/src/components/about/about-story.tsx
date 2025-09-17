import Image from "next/image"

export default function AboutStory() {
  return (
    <section className="py-16 bg-cream/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="relative w-full h-96 rounded-2xl overflow-hidden">
              <Image src="/placeholder.svg?height=400&width=500" alt="Our Journey" fill className="object-cover" />
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900">Our Journey</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                What started as a small vision to bring premium, carefully curated products to discerning customers has
                grown into a trusted destination for those who appreciate quality and style.
              </p>
              <p>
                We believe that every purchase should be an experience - from the moment you discover our products to
                the joy of owning something truly special. Our commitment to excellence drives everything we do, from
                product selection to customer service.
              </p>
              <p>
                Today, we're proud to serve thousands of customers worldwide, each sharing our passion for timeless
                elegance and exceptional craftsmanship.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
