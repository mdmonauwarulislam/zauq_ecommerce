"use client"

import useAuthGuard from "@/hooks/use-auth-guard"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import type { RootState } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DollarSign, ShoppingCart, Users, Package, TrendingUp, TrendingDown } from "lucide-react"

export default function AdminDashboard() {
  useAuthGuard()
  const { user } = useSelector((state: RootState) => state.auth)
  const router = useRouter()
  useEffect(() => {
    if (user && user.role !== "admin") {
      router.replace("/account")
    }
  }, [user, router])

  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1%",
      trend: "up",
      icon: DollarSign,
    },
    {
      title: "Orders",
      value: "2,350",
      change: "+180.1%",
      trend: "up",
      icon: ShoppingCart,
    },
    {
      title: "Customers",
      value: "1,234",
      change: "+19%",
      trend: "up",
      icon: Users,
    },
    {
      title: "Products",
      value: "573",
      change: "+201",
      trend: "up",
      icon: Package,
    },
  ]

  const recentOrders = [
    {
      id: "#3210",
      customer: "Olivia Martin",
      status: "Completed",
      amount: "$42.25",
      date: "2024-01-15",
    },
    {
      id: "#3209",
      customer: "Ava Johnson",
      status: "Processing",
      amount: "$74.99",
      date: "2024-01-14",
    },
    {
      id: "#3208",
      customer: "Michael Johnson",
      status: "Shipped",
      amount: "$64.75",
      date: "2024-01-13",
    },
    {
      id: "#3207",
      customer: "Lisa Anderson",
      status: "Completed",
      amount: "$34.50",
      date: "2024-01-12",
    },
  ]

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Soft gradient background with faint radial highlight */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#fbeee6] via-[#f7e6ef] to-[#e6f0fb]">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[120vw] h-[80vh] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#fff7f7]/80 via-[#fbeee6]/40 to-transparent opacity-80" />
      </div>
      <main className="max-w-7xl mx-auto px-2 sm:px-4 pt-16 space-y-16">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-light text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your store today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="flex items-center space-x-1 text-xs text-gray-600">
                  {stat.trend === "up" ? (
                    <TrendingUp className="w-3 h-3 text-green-500" />
                  ) : (
                    <TrendingDown className="w-3 h-3 text-red-500" />
                  )}
                  <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>{stat.change}</span>
                  <span>from last month</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div>
                      <div className="font-medium text-gray-900">{order.id}</div>
                      <div className="text-sm text-gray-600">{order.customer}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge
                      variant={
                        order.status === "Completed" ? "default" : order.status === "Processing" ? "secondary" : "outline"
                      }
                    >
                      {order.status}
                    </Badge>
                    <div className="text-right">
                      <div className="font-medium text-gray-900">{order.amount}</div>
                      <div className="text-sm text-gray-600">{order.date}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
