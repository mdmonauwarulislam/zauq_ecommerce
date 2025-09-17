import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin, Clock, MessageCircle, Headphones } from "lucide-react"

export default function ContactInfo() {
  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      details: "contact@luxecommerce.com",
      description: "Send us an email anytime",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+1 (555) 123-4567",
      description: "Mon-Fri from 8am to 5pm",
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      details: "Available 24/7",
      description: "Get instant support",
    },
  ]

  const officeInfo = [
    {
      icon: MapPin,
      title: "Visit Our Store",
      details: "123 Commerce Street\nNew York, NY 10001",
    },
    {
      icon: Clock,
      title: "Store Hours",
      details: "Monday - Friday: 9am - 8pm\nSaturday: 10am - 6pm\nSunday: 12pm - 5pm",
    },
    {
      icon: Headphones,
      title: "Customer Support",
      details: "24/7 support available\nAverage response time: 2 hours",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Contact Methods */}
      <div>
        <h2 className="text-2xl font-light text-gray-900 mb-6">Get in Touch</h2>
        <div className="space-y-4">
          {contactMethods.map((method, index) => (
            <Card key={index} className="border-0 shadow-sm bg-cream/30">
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-sage to-lavender rounded-lg flex items-center justify-center flex-shrink-0">
                    <method.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{method.title}</h3>
                    <p className="text-gray-900 font-medium">{method.details}</p>
                    <p className="text-gray-600 text-sm">{method.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Office Information */}
      <div>
        <h2 className="text-2xl font-light text-gray-900 mb-6">Visit Us</h2>
        <div className="space-y-4">
          {officeInfo.map((info, index) => (
            <Card key={index} className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <info.icon className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{info.title}</h3>
                    <p className="text-gray-600 text-sm whitespace-pre-line">{info.details}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Map Placeholder */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-0">
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-500">
              <MapPin className="w-12 h-12 mx-auto mb-2" />
              <p>Interactive Map</p>
              <p className="text-sm">123 Commerce Street, New York, NY</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
