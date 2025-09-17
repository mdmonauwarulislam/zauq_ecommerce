import useAuthGuard from "@/hooks/use-auth-guard"
import { useParams } from "next/navigation"

export default function ProductDetailPage() {
  useAuthGuard()
  const params = useParams()
  const { id } = params

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Product Details</h1>
      <p>Product ID: {id}</p>
      {/* TODO: Fetch and display product details here */}
    </div>
  )
} 