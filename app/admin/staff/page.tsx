'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  createStaffMember,
  getStaffMembers,
  updateStaffMember,
  deleteStaffMember,
} from '@/lib/content-service'
import { type StaffMember } from '@/lib/types'

export default function StaffManagement() {
  const [staff, setStaff] = useState<StaffMember[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    email: '',
    phone: '',
    role: 'Coach',
  })

  useEffect(() => {
    loadStaff()
  }, [])

  const loadStaff = () => {
    setStaff(getStaffMembers())
  }

  const handleSaveStaff = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingId) {
      updateStaffMember(editingId, {
        ...formData,
        profileImage: '/diverse-office-staff.png',
      })
      setEditingId(null)
    } else {
      createStaffMember({
        ...formData,
        profileImage: '/diverse-office-staff.png',
      })
    }
    loadStaff()
    setFormData({ name: '', position: '', email: '', phone: '', role: 'Coach' })
    setShowForm(false)
  }

  const handleEdit = (member: StaffMember) => {
    setFormData({
      name: member.name,
      position: member.position,
      email: member.email,
      phone: member.phone,
      role: member.role,
    })
    setEditingId(member.id)
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    if (confirm('Delete this staff member?')) {
      deleteStaffMember(id)
      loadStaff()
    }
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Staff Management</h1>
          <p className="text-muted-dark mt-1">Manage team members and staff</p>
        </div>
        <Button
          onClick={() => {
            setEditingId(null)
            setFormData({ name: '', position: '', email: '', phone: '', role: 'Coach' })
            setShowForm(!showForm)
          }}
          className="bg-primary hover:bg-primary-light"
        >
          {showForm ? 'Cancel' : 'Add Staff Member'}
        </Button>
      </div>

      {showForm && (
        <Card className="p-6 mb-8">
          <form onSubmit={handleSaveStaff} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded"
              required
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Position/Title"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className="px-4 py-2 border border-border rounded"
                required
              />
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="px-4 py-2 border border-border rounded"
              >
                <option value="Coach">Coach</option>
                <option value="Assistant Coach">Assistant Coach</option>
                <option value="Physio">Physiotherapist</option>
                <option value="Manager">Manager</option>
                <option value="Admin">Administrator</option>
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="px-4 py-2 border border-border rounded"
                required
              />
              <input
                type="tel"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="px-4 py-2 border border-border rounded"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary-light">
              {editingId ? 'Update Staff Member' : 'Add Staff Member'}
            </Button>
          </form>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {staff.map((member) => (
          <Card key={member.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="mb-4 h-32 bg-muted rounded flex items-center justify-center">
              <span className="text-5xl">👤</span>
            </div>
            <h3 className="font-bold text-lg text-foreground mb-1">{member.name}</h3>
            <p className="text-sm text-primary font-semibold mb-3">{member.position}</p>
            <div className="space-y-1 text-xs text-muted-dark mb-4">
              <p>📧 {member.email}</p>
              <p>📞 {member.phone}</p>
              <p>Role: {member.role}</p>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleEdit(member)}
                className="flex-1"
              >
                Edit
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleDelete(member.id)}
                className="flex-1 text-red-600"
              >
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {staff.length === 0 && !showForm && (
        <Card className="p-12 text-center">
          <p className="text-muted-dark mb-4">No staff members yet</p>
          <Button onClick={() => setShowForm(true)} className="bg-primary hover:bg-primary-light">
            Add Your First Staff Member
          </Button>
        </Card>
      )}
    </div>
  )
}
