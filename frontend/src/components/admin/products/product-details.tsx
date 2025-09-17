import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface ProductDetailsProps {
  product: any
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const getStatusBadge = (status: string, stock: number) => {
    if (status === "out_of_stock" || stock === 0) {
      return <Badge variant="destructive">Out of Stock</Badge>
    }
    if (status === "low_stock" || stock < 20) {
      return <Badge variant="secondary">Low Stock</Badge>
    }
    return <Badge className="bg-green-100 text-green-800">In Stock</Badge>
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Images */}
        <Card>
          <CardHeader>
            <CardTitle>Product Images</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
                <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="relative w-full h-16 bg-gray-100 rounded overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={`${product.name} ${i}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">{product.name}</h3>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-600">Category</span>
                <p className="font-medium">{product.category}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">SKU</span>
                <p className="font-medium">SKU-{product.id}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-600">Price</span>
                <div className="flex items-center space-x-2">
                  <p className="text-xl font-semibold text-gray-900">${product.price}</p>
                  {product.originalPrice && (
                    <p className="text-sm text-gray-500 line-through">${product.originalPrice}</p>
                  )}
                </div>
              </div>
              <div>
                <span className="text-sm text-gray-600">Stock</span>
                <div className="flex items-center space-x-2">
                  <p className="font-medium">{product.stock} units</p>
                  {getStatusBadge(product.status, product.stock)}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {product.featured && <Badge className="bg-blue-100 text-blue-800">Featured</Badge>}
              <Badge variant="outline">Active</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales Analytics */}
      <Card>
        <CardHeader>
          <CardTitle>Sales Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">{product.sales}</div>
              <div className="text-sm text-gray-600">Total Sales</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">${(product.sales * product.price).toFixed(2)}</div>
              <div className="text-sm text-gray-600">Revenue</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">4.8</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">156</div>
              <div className="text-sm text-gray-600">Reviews</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Specifications */}
      <Card>
        <CardHeader>
          <CardTitle>Specifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-4 py-2">
              <span className="text-gray-600">Material</span>
              <span className="font-medium">Premium Leather</span>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-4 py-2">
              <span className="text-gray-600">Dimensions</span>
              <span className="font-medium">25cm x 15cm x 8cm</span>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-4 py-2">
              <span className="text-gray-600">Weight</span>
              <span className="font-medium">0.8kg</span>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-4 py-2">
              <span className="text-gray-600">Color Options</span>
              <span className="font-medium">Black, Brown, Navy</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tags */}
      <Card>
        <CardHeader>
          <CardTitle>Tags</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">Premium</Badge>
            <Badge variant="secondary">Bestseller</Badge>
            <Badge variant="secondary">New Arrival</Badge>
            <Badge variant="secondary">Limited Edition</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
