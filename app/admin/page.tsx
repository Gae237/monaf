'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth-service'

export default function AdminPage() {
  const router = useRouter()

  useEffect(() => {
    const user = getCurrentUser()
    if (user) {
      router.push('/admin/dashboard')
    } else {
      router.push('/admin/login')
    }
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary">
          <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
        </div>
        <p className="text-foreground">Loading...</p>
      </div>
    </div>
  )
}
