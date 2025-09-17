import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Mail, Phone, Calendar, ShoppingCart, DollarSign, Crown, MapPin } from "lucide-react"

interface UserDetailsProps {
  user: any
}

export default function UserDetails({ user }: UserDetailsProps) {
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { variant: "default" as const, label: "Active", className: "bg-green-100 text-green-800" },
      inactive: { variant: "secondary" as const, label: "Inactive" },
      banned: { variant: "destructive" as const, label: "Banned" },
    }

    const config = statusConfig[status as keyof typeof statusConfig]
    return (
      <Badge variant={config.variant} className={config.className}>
        {config.label}
      </Badge>
    )
  }

  const getRoleBadge = (role: string) => {
    return role === "admin" ? (
      <Badge className="bg-purple-100 text-purple-800">
        <Crown className="w-3 h-3 mr-1" />
        Admin
      </Badge>
    ) : (
      <Badge variant="outline">Customer</Badge>
    )
  }

  const recentOrders = [
    { id: "#12345", date: "2024-01-15", total: 299.99, status: "delivered" },
    { id: "#12344", date: "2024-01-10", total: 189.5, status: "processing" },
    { id: "#12343", date: "2024-01-05", total: 449.99, status: "shipped" },
  ]

  return (
    <div className="space-y-6">
      {/* User Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-6">
            <Avatar className="w-20 h-20">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback className="text-xl">
                {user.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-2">
                <h2 className="text-2xl font-semibold text-gray-900">{user.name}</h2>
                {getRoleBadge(user.role)}
                {getStatusBadge(user.status)}
              </div>
              <div className="space-y-1 text-gray-600">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  {user.email}
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  {user.phone}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Joined {user.joinDate}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Account Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>Account Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <ShoppingCart className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                <div className="text-2xl font-bold text-gray-900">{user.totalOrders}</div>
                <div className="text-sm text-gray-600">Total Orders</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <DollarSign className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                <div className="text-2xl font-bold text-gray-900">${user.totalSpent.toFixed(2)}</div>
                <div className="text-sm text-gray-600">Total Spent</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Information */}
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-600">User ID</span>
                <p className="font-medium">{user.id}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Last Login</span>
                <p className="font-medium">{user.lastLogin}</p>
              </div>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-600">Account Status</span>
                <div className="mt-1">{getStatusBadge(user.status)}</div>
              </div>
              <div>
                <span className="text-sm text-gray-600">Role</span>
                <div className="mt-1">{getRoleBadge(user.role)}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      {user.role === "customer" && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div>
                      <div className="font-medium text-gray-900">{order.id}</div>
                      <div className="text-sm text-gray-600">{order.date}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge
                      variant={
                        order.status === "delivered"
                          ? "default"
                          : order.status === "processing"
                            ? "secondary"
                            : "outline"
                      }
                      className={order.status === "delivered" ? "bg-green-100 text-green-800" : ""}
                    >
                      {order.status}
                    </Badge>
                    <div className="text-right">
                      <div className="font-medium text-gray-900">${order.total.toFixed(2)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Addresses */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            Saved Addresses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border border-gray-100 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">Home Address</h4>
                <Badge variant="outline">Default</Badge>
              </div>
              <p className="text-gray-600">123 Main Street, Apt 4B</p>
              <p className="text-gray-600">New York, NY 10001</p>
              <p className="text-gray-600">United States</p>
            </div>
            <div className="p-4 border border-gray-100 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Work Address</h4>
              <p className="text-gray-600">456 Business Ave, Suite 200</p>
              <p className="text-gray-600">New York, NY 10002</p>
              <p className="text-gray-600">United States</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
