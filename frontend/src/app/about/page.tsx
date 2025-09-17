import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import AboutHero from "@/components/about/about-hero"
import AboutStory from "@/components/about/about-story"
import AboutTeam from "@/components/about/about-team"
import AboutValues from "@/components/about/about-values"
import AboutStats from "@/components/about/about-stats"

export default function AboutPage() {
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Soft gradient background with faint radial highlight */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#fbeee6] via-[#f7e6ef] to-[#e6f0fb]">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[120vw] h-[80vh] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#fff7f7]/80 via-[#fbeee6]/40 to-transparent opacity-80" />
      </div>
    
      <main className="max-w-7xl mx-auto px-2 sm:px-4 pt-16 space-y-16">
        <AboutHero />
        <AboutStory />
        <AboutValues />
        <AboutStats />
        <AboutTeam />
      </main>
  
    </div>
  )
}
