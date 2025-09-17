"use client"
import AccountSidebar from "@/components/account/account-sidebar"
import AccountDashboard from "@/components/account/account-dashboard"
import useAuthGuard from "@/hooks/use-auth-guard"

export default function AccountPage() {
  useAuthGuard()
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Soft gradient background with faint radial highlight */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#fbeee6] via-[#f7e6ef] to-[#e6f0fb]">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[120vw] h-[80vh] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#fff7f7]/80 via-[#fbeee6]/40 to-transparent opacity-80" />
      </div>
      <main className="max-w-7xl mx-auto px-2 sm:px-4 pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-2">My Account</h1>
            <p className="text-gray-600">Manage your account settings and view your order history</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <AccountSidebar />
            </div>
            <div className="lg:col-span-3">
              <AccountDashboard />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
