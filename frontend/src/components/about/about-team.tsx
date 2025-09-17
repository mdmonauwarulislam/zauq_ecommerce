import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutTeam() {
  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "/placeholder.svg?height=300&width=300",
      bio: "With over 15 years in luxury retail, Sarah founded Luxe with a vision to make premium products accessible to everyone.",
    },
    {
      name: "Michael Chen",
      role: "Head of Product",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Michael's keen eye for quality and trends ensures our product selection always meets the highest standards.",
    },
    {
      name: "Emily Rodriguez",
      role: "Customer Experience Director",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Emily leads our customer service team, ensuring every interaction exceeds expectations.",
    },
  ]

  return (
    <section className="py-16 bg-cream/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">Meet Our Team</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            The passionate individuals behind Luxe, dedicated to bringing you the best shopping experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <Card key={index} className="border-0 shadow-sm bg-white">
              <CardContent className="p-6 text-center">
                <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-sage-foreground font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
