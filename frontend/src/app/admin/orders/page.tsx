"use client"
import OrdersManagement from "@/components/admin/orders/orders-management"
import useAuthGuard from "@/hooks/use-auth-guard"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import type { RootState } from "@/lib/store"

export default function AdminOrdersPage() {
  useAuthGuard()
  const { user } = useSelector((state: RootState) => state.auth)
  const router = useRouter()
  useEffect(() => {
    if (user && user.role !== "admin") {
      router.replace("/account")
    }
  }, [user, router])
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Soft gradient background with faint radial highlight */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#fbeee6] via-[#f7e6ef] to-[#e6f0fb]">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[120vw] h-[80vh] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#fff7f7]/80 via-[#fbeee6]/40 to-transparent opacity-80" />
      </div>
      <main className="max-w-7xl mx-auto px-2 sm:px-4 pt-16">
        <OrdersManagement />
      </main>
    </div>
  )
}
