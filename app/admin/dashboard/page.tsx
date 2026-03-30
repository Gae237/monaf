'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getStatistics } from '@/lib/content-service'
import { getCurrentUser } from '@/lib/auth-service'
import { canEdit } from '@/lib/permissions'
import Link from 'next/link'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { type AdminUser } from '@/lib/types'

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null)
  const [user, setUser] = useState<AdminUser | null>(null)

  useEffect(() => {
    const currentUser = getCurrentUser()
    setUser(currentUser)
    getStatistics().then(setStats)
  }, [])

  if (!stats || !user) return null

  const chartData = [
    { name: 'News', value: stats.publishedArticles },
    { name: 'Events', value: stats.activeEvents },
    { name: 'Registrations', value: stats.approvedRegistrations },
    { name: 'Staff', value: stats.totalStaff },
  ]

  const quickActions = [
    {
      title: 'Gallery Management',
      description: 'Upload and organize photos and videos',
      href: '/admin/gallery',
      label: 'Manage Gallery',
      allowed: canEdit(user.role, 'gallery'),
    },
    {
      title: 'News & Articles',
      description: 'Create and manage news content',
      href: '/admin/news',
      label: 'Manage News',
      allowed: canEdit(user.role, 'news'),
    },
    {
      title: 'Events',
      description: 'Create tournaments and events',
      href: '/admin/events',
      label: 'Manage Events',
      allowed: canEdit(user.role, 'events'),
    },
    {
      title: 'Registrations',
      description: 'View and manage player applications',
      href: '/admin/registrations',
      label: 'View Registrations',
      allowed: canEdit(user.role, 'registrations'),
    },
    {
      title: 'Staff Management',
      description: 'Manage team members and staff',
      href: '/admin/staff',
      label: 'Manage Staff',
      allowed: canEdit(user.role, 'staff'),
    },
    {
      title: 'User Management',
      description: 'Manage admin accounts and roles',
      href: '/admin/users',
      label: 'Manage Users',
      allowed: canEdit(user.role, 'users'),
    },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Admin Dashboard</h1>
        <p className="text-muted-dark">
          Welcome back, <span className="font-semibold">{user.name}</span>!
          <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded capitalize">
            {user.role.replace('-', ' ')}
          </span>
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-dark mb-2">Total News Articles</h3>
          <p className="text-3xl font-bold text-primary">{stats.totalNewsArticles}</p>
          <p className="text-xs text-muted-dark mt-2">{stats.publishedArticles} published</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-dark mb-2">Total Events</h3>
          <p className="text-3xl font-bold text-primary">{stats.totalEvents}</p>
          <p className="text-xs text-muted-dark mt-2">{stats.activeEvents} active</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-dark mb-2">Player Registrations</h3>
          <p className="text-3xl font-bold text-primary">{stats.totalRegistrations}</p>
          <p className="text-xs text-muted-dark mt-2">{stats.pendingRegistrations} pending</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-dark mb-2">Staff Members</h3>
          <p className="text-3xl font-bold text-primary">{stats.totalStaff}</p>
          <p className="text-xs text-muted-dark mt-2">Active members</p>
        </Card>
      </div>

      {/* Chart */}
      <Card className="p-6 mb-8">
        <h2 className="text-xl font-bold text-foreground mb-6">Content Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#1e3a8a" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Quick Actions — only show what the user can access */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quickActions.filter(a => a.allowed).map((action) => (
          <Card key={action.href} className="p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-bold text-foreground mb-4">{action.title}</h3>
            <p className="text-sm text-muted-dark mb-4">{action.description}</p>
            <Link href={action.href}>
              <Button className="w-full bg-primary hover:bg-primary-light">{action.label}</Button>
            </Link>
          </Card>
        ))}

        {/* Viewers see a read-only message */}
        {quickActions.filter(a => a.allowed).length === 0 && (
          <Card className="p-6 col-span-3 text-center">
            <p className="text-muted-dark">You have view-only access. Contact a Super Admin to request more permissions.</p>
          </Card>
        )}
      </div>
    </div>
  )
}