import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#a31621] text-[#fffcdc] border-t border-[#a31621]/20 shadow-[0_-2px_16px_0_rgba(163,22,33,0.08)] pt-12 pb-6">
      <div className="container mx-auto px-4 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-10 border-b border-[#fffcdc]/10">
          {/* Brand Section */}
          <div className="space-y-5">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#fffcdc] rounded-2xl flex items-center justify-center shadow">
                <span className="text-[#a31621] font-extrabold text-lg">L</span>
              </div>
              <span className="text-2xl font-extrabold text-[#fffcdc] tracking-tight">Luxe</span>
            </div>
            <p className="text-[#fffcdc]/80 text-base leading-relaxed">
              Discover premium products with our modern, elegant shopping experience. Quality and style in every
              purchase.
            </p>
            <div className="flex space-x-3 pt-2">
              <Button variant="ghost" size="icon" className="rounded-full bg-[#fffcdc]/10 text-[#fffcdc] hover:bg-[#fffcdc] hover:text-[#a31621] transition-colors">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full bg-[#fffcdc]/10 text-[#fffcdc] hover:bg-[#fffcdc] hover:text-[#a31621] transition-colors">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full bg-[#fffcdc]/10 text-[#fffcdc] hover:bg-[#fffcdc] hover:text-[#a31621] transition-colors">
                <Twitter className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-5">
            <h3 className="font-bold text-[#fffcdc]">Quick Links</h3>
            <div className="space-y-2">
              {["About Us", "Products", "Categories", "Contact", "FAQ"].map((link) => (
                <Link
                  key={link}
                  href={`/${link.toLowerCase().replace(" ", "-")}`}
                  className="block text-[#fffcdc]/80 hover:text-[#fffcdc] transition-colors text-base font-medium"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-5">
            <h3 className="font-bold text-[#fffcdc]">Customer Service</h3>
            <div className="space-y-2">
              {["Shipping Info", "Returns", "Size Guide", "Track Order", "Support"].map((link) => (
                <Link
                  key={link}
                  href={`/${link.toLowerCase().replace(" ", "-")}`}
                  className="block text-[#fffcdc]/80 hover:text-[#fffcdc] transition-colors text-base font-medium"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-5">
            <h3 className="font-bold text-[#fffcdc]">Stay Updated</h3>
            <p className="text-[#fffcdc]/80 text-base">Subscribe to get special offers and updates.</p>
            <div className="flex space-x-2">
              <Input type="email" placeholder="Enter your email" className="bg-[#fffcdc] text-[#a31621] rounded-full px-4 py-2 border border-[#fffcdc]/30 focus:border-[#fffcdc] placeholder:text-[#a31621]/60" />
              <Button className="rounded-full bg-[#fffcdc] hover:bg-[#fffcdc]/90 text-[#a31621] px-6 py-2 font-semibold">Subscribe</Button>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-base text-[#fffcdc]/90 py-8">
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-[#fffcdc]" />
            <span>contact@luxecommerce.com</span>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-[#fffcdc]" />
            <span>+1 (555) 123-4567</span>
          </div>
          <div className="flex items-center space-x-3">
            <MapPin className="w-5 h-5 text-[#fffcdc]" />
            <span>123 Commerce St, City, State 12345</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#fffcdc]/10 pt-6 text-center">
          <p className="text-[#fffcdc]/70 text-sm font-medium">
            © 2024 Luxe Commerce. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  )
}
