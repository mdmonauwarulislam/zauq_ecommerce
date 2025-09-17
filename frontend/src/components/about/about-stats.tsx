export default function AboutStats() {
  const stats = [
    { number: "10K+", label: "Happy Customers", description: "Satisfied customers worldwide" },
    { number: "500+", label: "Premium Products", description: "Carefully curated items" },
    { number: "99%", label: "Satisfaction Rate", description: "Customer satisfaction score" },
    { number: "5+", label: "Years Experience", description: "In premium retail" },
  ]

  return (
    <section className="py-16 gradient-bg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light text-white mb-4">Our Impact</h2>
          <p className="text-white/90 max-w-2xl mx-auto">
            Numbers that reflect our commitment to excellence and customer satisfaction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center text-white">
              <div className="text-4xl md:text-5xl font-light mb-2">{stat.number}</div>
              <div className="text-xl font-semibold mb-1">{stat.label}</div>
              <div className="text-white/80 text-sm">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-sage/80 to-lavender/80" />
    </section>
  )
}
