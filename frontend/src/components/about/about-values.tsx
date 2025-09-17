import { Heart, Shield, Star, Users } from "lucide-react"

export default function AboutValues() {
  const values = [
    {
      icon: Heart,
      title: "Passion for Quality",
      description:
        "We're passionate about bringing you products that meet the highest standards of quality and craftsmanship.",
    },
    {
      icon: Shield,
      title: "Trust & Reliability",
      description:
        "Building lasting relationships with our customers through transparency, honesty, and reliable service.",
    },
    {
      icon: Star,
      title: "Excellence in Everything",
      description:
        "From product curation to customer experience, we strive for excellence in every aspect of our business.",
    },
    {
      icon: Users,
      title: "Customer-Centric",
      description:
        "Our customers are at the heart of everything we do. Your satisfaction is our ultimate measure of success.",
    },
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">Our Values</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            These core values guide every decision we make and shape the way we serve our customers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-sage to-lavender rounded-2xl flex items-center justify-center mx-auto">
                <value.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{value.title}</h3>
              <p className="text-gray-600 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
