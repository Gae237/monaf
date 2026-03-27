'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getPlayerRegistrations, updatePlayerRegistration } from '@/lib/content-service'
import { type PlayerRegistration } from '@/lib/types'

export default function RegistrationsManagement() {
  const [registrations, setRegistrations] = useState<PlayerRegistration[]>([])
  const [filter, setFilter] = useState({ status: 'all', category: 'all' })
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    loadRegistrations()
  }, [])

  const loadRegistrations = () => {
    setRegistrations(getPlayerRegistrations())
  }

  const handleApprove = (id: string) => {
    updatePlayerRegistration(id, { status: 'approved' })
    loadRegistrations()
  }

  const handleReject = (id: string) => {
    updatePlayerRegistration(id, { status: 'rejected' })
    loadRegistrations()
  }

  const filteredRegistrations = registrations.filter((reg) => {
    const statusMatch = filter.status === 'all' || reg.status === filter.status
    const categoryMatch = filter.category === 'all' || reg.category === filter.category
    const searchMatch = 
      reg.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.email.toLowerCase().includes(searchTerm.toLowerCase())
    return statusMatch && categoryMatch && searchMatch
  })

  const stats = {
    total: registrations.length,
    pending: registrations.filter(r => r.status === 'pending').length,
    approved: registrations.filter(r => r.status === 'approved').length,
    rejected: registrations.filter(r => r.status === 'rejected').length,
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Player Registrations</h1>
        <p className="text-muted-dark mt-1">Review and manage player applications</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="p-4">
          <h3 className="text-sm font-medium text-muted-dark">Total</h3>
          <p className="text-3xl font-bold text-primary">{stats.total}</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-medium text-muted-dark">Pending</h3>
          <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-medium text-muted-dark">Approved</h3>
          <p className="text-3xl font-bold text-green-600">{stats.approved}</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-medium text-muted-dark">Rejected</h3>
          <p className="text-3xl font-bold text-red-600">{stats.rejected}</p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-border rounded col-span-2"
          />
          <select
            value={filter.status}
            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
            className="px-4 py-2 border border-border rounded"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          <select
            value={filter.category}
            onChange={(e) => setFilter({ ...filter, category: e.target.value })}
            className="px-4 py-2 border border-border rounded"
          >
            <option value="all">All Categories</option>
            <option value="U8">U8</option>
            <option value="U10">U10</option>
            <option value="U12">U12</option>
            <option value="U15">U15</option>
            <option value="U17">U17</option>
          </select>
        </div>
      </Card>

      {/* Registrations Table */}
      <div className="space-y-3">
        {filteredRegistrations.map((reg) => (
          <Card key={reg.id} className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-bold text-lg text-foreground">{reg.firstName} {reg.lastName}</h3>
                <div className="grid grid-cols-2 gap-2 text-sm text-muted-dark mt-2">
                  <span>📧 {reg.email}</span>
                  <span>📞 {reg.phone}</span>
                  <span>🎂 {new Date(reg.dateOfBirth).toLocaleDateString()}</span>
                  <span>Category: {reg.category}</span>
                  <span>Program: {reg.programType}</span>
                  <span>Applied: {new Date(reg.registeredAt).toLocaleDateString()}</span>
                </div>
                {reg.notes && <p className="text-sm text-muted-dark mt-2 italic">Notes: {reg.notes}</p>}
              </div>
              <div className="flex flex-col gap-2 md:items-end">
                <span className={`px-3 py-1 text-sm rounded font-semibold ${
                  reg.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-700'
                    : reg.status === 'approved'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {reg.status.charAt(0).toUpperCase() + reg.status.slice(1)}
                </span>
                {reg.status === 'pending' && (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleApprove(reg.id)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleReject(reg.id)}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredRegistrations.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-muted-dark">No registrations found</p>
        </Card>
      )}
    </div>
  )
}
