'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getStatistics } from '@/lib/content-service'
import Link from 'next/link'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null)

  useEffect(() => {
    setStats(getStatistics())
  }, [])

  if (!stats) return null

  const chartData = [
    { name: 'News', value: stats.publishedArticles },
    { name: 'Events', value: stats.activeEvents },
    { name: 'Registrations', value: stats.approvedRegistrations },
    { name: 'Staff', value: stats.totalStaff },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Admin Dashboard</h1>
        <p className="text-muted-dark">Welcome back! Here's what's happening today.</p>
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

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-bold text-foreground mb-4">Gallery Management</h3>
          <p className="text-sm text-muted-dark mb-4">Upload and organize photos and videos</p>
          <Link href="/admin/gallery">
            <Button className="w-full bg-primary hover:bg-primary-light">Manage Gallery</Button>
          </Link>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-bold text-foreground mb-4">News & Articles</h3>
          <p className="text-sm text-muted-dark mb-4">Create and manage news content</p>
          <Link href="/admin/news">
            <Button className="w-full bg-primary hover:bg-primary-light">Manage News</Button>
          </Link>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-bold text-foreground mb-4">Events</h3>
          <p className="text-sm text-muted-dark mb-4">Create tournaments and events</p>
          <Link href="/admin/events">
            <Button className="w-full bg-primary hover:bg-primary-light">Manage Events</Button>
          </Link>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-bold text-foreground mb-4">Registrations</h3>
          <p className="text-sm text-muted-dark mb-4">View and manage player applications</p>
          <Link href="/admin/registrations">
            <Button className="w-full bg-primary hover:bg-primary-light">View Registrations</Button>
          </Link>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-bold text-foreground mb-4">Staff Management</h3>
          <p className="text-sm text-muted-dark mb-4">Manage team members and staff</p>
          <Link href="/admin/staff">
            <Button className="w-full bg-primary hover:bg-primary-light">Manage Staff</Button>
          </Link>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-bold text-foreground mb-4">User Management</h3>
          <p className="text-sm text-muted-dark mb-4">Manage admin accounts and roles</p>
          <Link href="/admin/users">
            <Button className="w-full bg-primary hover:bg-primary-light">Manage Users</Button>
          </Link>
        </Card>
      </div>
    </div>
  )
}
