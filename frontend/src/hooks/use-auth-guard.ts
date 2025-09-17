import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import type { RootState } from "@/lib/store"

export default function useAuthGuard(redirectTo: string = "/auth/login") {
  const { isAuthenticated, loading } = useSelector((state: RootState) => state.auth)
  const router = useRouter()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace(redirectTo)
    }
  }, [isAuthenticated, loading, router, redirectTo])

  return { isAuthenticated, loading }
} 