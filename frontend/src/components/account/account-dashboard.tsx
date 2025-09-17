import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Package, Heart, MapPin, CreditCard, ArrowRight } from "lucide-react"

export default function AccountDashboard() {
  const recentOrders = [
    {
      id: "#12345",
      date: "2024-01-15",
      status: "Delivered",
      total: "$299.99",
      items: 2,
    },
    {
      id: "#12344",
      date: "2024-01-10",
      status: "Processing",
      total: "$189.50",
      items: 1,
    },
    {
      id: "#12343",
      date: "2024-01-05",
      status: "Shipped",
      total: "$449.99",
      items: 3,
    },
  ]

  const quickActions = [
    {
      title: "View Orders",
      description: "Track your recent purchases",
      icon: Package,
      href: "/account/orders",
      count: "12 orders",
    },
    {
      title: "Wishlist",
      description: "Items you've saved for later",
      icon: Heart,
      href: "/account/wishlist",
      count: "8 items",
    },
    {
      title: "Addresses",
      description: "Manage shipping addresses",
      icon: MapPin,
      href: "/account/addresses",
      count: "2 addresses",
    },
    {
      title: "Payment Methods",
      description: "Manage your payment options",
      icon: CreditCard,
      href: "/account/payment",
      count: "1 card",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <Card className="border-0 shadow-sm gradient-bg">
        <CardContent className="p-6 text-white">
          <h2 className="text-2xl font-light mb-2">Welcome back, John!</h2>
          <p className="text-white/90">Here's what's happening with your account today.</p>
        </CardContent>
        <div className="absolute inset-0 bg-gradient-to-r from-sage/80 to-lavender/80 rounded-lg" />
      </Card>

      {/* Quick Actions */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickActions.map((action, index) => (
            <Link key={index} href={action.href}>
              <Card className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <action.icon className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{action.title}</h4>
                        <p className="text-sm text-gray-600">{action.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">{action.count}</div>
                      <ArrowRight className="w-4 h-4 text-gray-400 ml-auto mt-1" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Orders */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900">Recent Orders</h3>
          <Link href="/account/orders">
            <Button variant="outline" size="sm">
              View All Orders
            </Button>
          </Link>
        </div>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100">
              {recentOrders.map((order, index) => (
                <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div>
                        <div className="font-medium text-gray-900">{order.id}</div>
                        <div className="text-sm text-gray-600">{order.date}</div>
                      </div>
                      <Badge
                        variant={
                          order.status === "Delivered"
                            ? "default"
                            : order.status === "Processing"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {order.status}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-gray-900">{order.total}</div>
                      <div className="text-sm text-gray-600">{order.items} items</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Account Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Orders</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold text-gray-900">12</div>
            <p className="text-xs text-gray-600">Since joining</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Spent</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold text-gray-900">$2,847</div>
            <p className="text-xs text-gray-600">Lifetime value</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Wishlist Items</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold text-gray-900">8</div>
            <p className="text-xs text-gray-600">Saved for later</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
