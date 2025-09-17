"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Package, Heart, MapPin, CreditCard, Settings, LogOut } from "lucide-react"

export default function AccountSidebar() {
  const [activeTab, setActiveTab] = useState("dashboard")

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: User, href: "/account" },
    { id: "orders", label: "Orders", icon: Package, href: "/account/orders" },
    { id: "wishlist", label: "Wishlist", icon: Heart, href: "/account/wishlist" },
    { id: "addresses", label: "Addresses", icon: MapPin, href: "/account/addresses" },
    { id: "payment", label: "Payment Methods", icon: CreditCard, href: "/account/payment" },
    { id: "settings", label: "Settings", icon: Settings, href: "/account/settings" },
  ]

  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-6">
        {/* User Profile */}
        <div className="text-center mb-6 pb-6 border-b border-gray-100">
          <Avatar className="w-20 h-20 mx-auto mb-4">
            <AvatarImage src="/placeholder.svg?height=80&width=80" alt="User" />
            <AvatarFallback className="bg-gradient-to-br from-sage to-lavender text-white text-xl">JD</AvatarFallback>
          </Avatar>
          <h3 className="font-semibold text-gray-900 mb-1">John Doe</h3>
          <p className="text-sm text-gray-600">john.doe@example.com</p>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link key={item.id} href={item.href}>
              <Button
                variant={activeTab === item.id ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab(item.id)}
              >
                <item.icon className="w-4 h-4 mr-3" />
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="pt-6 mt-6 border-t border-gray-100">
          <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
            <LogOut className="w-4 h-4 mr-3" />
            Logout
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
