'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { login } from '@/lib/auth-service'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import Link from 'next/link'

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('admin@omsa.com')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const user = login(email, password)
    if (!user) {
      setError('Invalid email or password')
      setLoading(false)
      return
    }

    router.push('/admin/dashboard')
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary to-primary-light p-4">
      <Card className="w-full max-w-md p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-primary mb-2">OMSA Admin</h1>
          <p className="text-muted-dark">Olympic Monaf Sport Academy</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Email Address
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@omsa.com"
              required
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Password
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full"
            />
            <p className="text-xs text-muted-dark mt-2">Demo: Any password (use: password123)</p>
          </div>

          {error && (
            <div className="p-3 bg-red-50 text-red-700 rounded text-sm">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-light text-white"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-sm text-muted-dark text-center">
            <strong>Demo Credentials:</strong><br />
            Email: admin@omsa.com<br />
            Password: Admin@123456
          </p>
        </div>

        <div className="mt-4 text-center">
          <Link href="/" className="text-sm text-primary hover:underline">
            Back to Website
          </Link>
        </div>
      </Card>
    </div>
  )
}
