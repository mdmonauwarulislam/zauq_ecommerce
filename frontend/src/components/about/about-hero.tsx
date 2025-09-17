import Image from "next/image"

export default function AboutHero() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-light text-gray-900 leading-tight">
                Our
                <span className="block font-semibold bg-gradient-to-r from-sage-foreground to-lavender-foreground bg-clip-text text-transparent">
                  Story
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Founded with a passion for timeless elegance and exceptional quality, we've been curating premium
                products that blend modern sophistication with classic design principles.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden">
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="Our Story"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
