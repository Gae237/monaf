"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { getCurrentUser } from "@/lib/auth-service"
import AdminNavigation from "@/components/admin-navigation"
import type { AdminUser } from "@/lib/types"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<AdminUser | null>(null)
  const [loading, setLoading] = useState(true)

  const isLoginPage = pathname === "/admin/login"

  useEffect(() => {
    if (isLoginPage) {
      setLoading(false)
      return
    }

    const currentUser = getCurrentUser()
    if (!currentUser) {
      router.push("/admin/login")
      return
    }

    setUser(currentUser)
    setLoading(false)
  }, [router, isLoginPage])

  // Page de login — pas de sidebar
  if (isLoginPage) {
    return <>{children}</>
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
          </div>
          <p className="text-foreground">Chargement...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex h-screen bg-background">
      <AdminNavigation user={user} />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}