export default function ContactHero() {
  return (
    <section className="relative py-20 gradient-bg">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-light text-white mb-6">Get in Touch</h1>
          <p className="text-xl text-white/90 leading-relaxed">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-sage/80 to-lavender/80" />
    </section>
  )
}
