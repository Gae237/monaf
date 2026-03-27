'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { logout } from '@/lib/auth-service'
import { type AdminUser } from '@/lib/types'
import { Button } from '@/components/ui/button'

interface AdminNavigationProps {
  user: AdminUser
}

export default function AdminNavigation({ user }: AdminNavigationProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = () => {
    logout()
    router.push('/admin/login')
  }

  const navItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/admin/gallery', label: 'Gallery', icon: '📸', roles: ['admin', 'super-admin', 'editor'] },
    { href: '/admin/news', label: 'News & Articles', icon: '📰', roles: ['admin', 'super-admin', 'editor'] },
    { href: '/admin/events', label: 'Events', icon: '🎯', roles: ['admin', 'super-admin'] },
    { href: '/admin/registrations', label: 'Registrations', icon: '👥', roles: ['admin', 'super-admin'] },
    { href: '/admin/staff', label: 'Staff', icon: '👔', roles: ['admin', 'super-admin'] },
    { href: '/admin/users', label: 'Users', icon: '👤', roles: ['super-admin'] },
  ]

  const isActive = (href: string) => pathname === href

  const filteredItems = navItems.filter(item => {
    if (!item.roles) return true
    return item.roles.includes(user.role)
  })

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-primary text-white rounded"
      >
        {mobileOpen ? '✕' : '☰'}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static top-0 left-0 h-screen w-64 bg-primary text-white p-6 shadow-lg
          transform transition-transform duration-300 z-40
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="mb-8 mt-12 md:mt-0">
          <h1 className="text-2xl font-bold">OMSA</h1>
          <p className="text-sm text-blue-100">Admin Panel</p>
        </div>

        <div className="mb-8 p-4 bg-blue-700 rounded-lg">
          <p className="text-xs text-blue-100 mb-1">Logged in as</p>
          <p className="font-semibold text-sm">{user.name}</p>
          <p className="text-xs text-blue-100 capitalize">{user.role.replace('-', ' ')}</p>
        </div>

        <nav className="space-y-2 mb-8">
          {filteredItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`
                flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                ${isActive(item.href)
                  ? 'bg-blue-700 text-white'
                  : 'text-blue-100 hover:bg-blue-600'
                }
              `}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="border-t border-blue-500 pt-4 space-y-3">
          <Link href="/">
            <Button variant="outline" className="w-full text-white border-white hover:bg-blue-700">
              View Website
            </Button>
          </Link>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full text-white border-white hover:bg-blue-700"
          >
            Logout
          </Button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  )
}
