import ContactHero from "@/components/contact/contact-hero"
import ContactForm from "@/components/contact/contact-form"
import ContactInfo from "@/components/contact/contact-info"

export default function ContactPage() {
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Soft gradient background with faint radial highlight */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#fbeee6] via-[#f7e6ef] to-[#e6f0fb]">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[120vw] h-[80vh] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#fff7f7]/80 via-[#fbeee6]/40 to-transparent opacity-80" />
      </div>
      <main className="max-w-7xl mx-auto px-2 sm:px-4 pt-16 space-y-16">
        <ContactHero />
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </main>
    </div>
  )
}
