import useAuthGuard from "@/hooks/use-auth-guard"
import { useParams } from "next/navigation"

export default function OrderDetailPage() {
  useAuthGuard()
  const params = useParams()
  const { id } = params

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Order Details</h1>
      <p>Order ID: {id}</p>
      {/* TODO: Fetch and display order details here */}
    </div>
  )
} 