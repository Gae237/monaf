'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getAllUsers, createUser, updateUserRole, deactivateUser, getCurrentUser } from '@/lib/auth-service'
import { type AdminUser, type UserRole } from '@/lib/types'

export default function UsersManagement() {
  const [users, setUsers] = useState<AdminUser[]>([])
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    role: 'editor' as UserRole,
  })
  const [error, setError] = useState('')

  useEffect(() => {
    const user = getCurrentUser()
    setCurrentUser(user)
    loadUsers()
  }, [])

  const loadUsers = () => {
    setUsers(getAllUsers())
  }

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (currentUser?.role !== 'super-admin') {
      setError('Only super admins can create users')
      return
    }

    try {
      createUser({
        email: formData.email,
        name: formData.name,
        password: formData.password,
        role: formData.role,
        isActive: true,
      })
      loadUsers()
      setFormData({ email: '', name: '', password: '', role: 'editor' })
      setShowForm(false)
    } catch (err) {
      setError((err as Error).message)
    }
  }

  const handleChangeRole = (email: string, newRole: UserRole) => {
    if (currentUser?.role !== 'super-admin') return
    updateUserRole(email, newRole)
    loadUsers()
  }

  const handleDeactivate = (email: string) => {
    if (currentUser?.role !== 'super-admin') return
    if (confirm('Deactivate this user?')) {
      deactivateUser(email)
      loadUsers()
    }
  }

  if (currentUser?.role !== 'super-admin') {
    return (
      <div className="p-8">
        <Card className="p-6 text-center">
          <p className="text-red-600 font-semibold">Access Denied</p>
          <p className="text-muted-dark">Only super admins can access this page</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">User Management</h1>
          <p className="text-muted-dark mt-1">Manage admin accounts and roles</p>
        </div>
        <Button
          onClick={() => {
            setError('')
            setFormData({ email: '', name: '', password: '', role: 'editor' })
            setShowForm(!showForm)
          }}
          className="bg-primary hover:bg-primary-light"
        >
          {showForm ? 'Cancel' : 'Create User'}
        </Button>
      </div>

      {showForm && (
        <Card className="p-6 mb-8">
          <form onSubmit={handleCreateUser} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="px-4 py-2 border border-border rounded"
                required
              />
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="px-4 py-2 border border-border rounded"
                required
              />
            </div>
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded"
              required
            />
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
              className="w-full px-4 py-2 border border-border rounded"
            >
              <option value="viewer">Viewer (View only)</option>
              <option value="editor">Editor (News only)</option>
              <option value="admin">Admin (Most features)</option>
            </select>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <Button type="submit" className="w-full bg-primary hover:bg-primary-light">
              Create User
            </Button>
          </form>
        </Card>
      )}

      <div className="space-y-3">
        {users.map((user) => (
          <Card key={user.id} className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-bold text-lg text-foreground">{user.name}</h3>
                <p className="text-sm text-muted-dark">{user.email}</p>
                <div className="flex gap-3 mt-2 text-xs">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded capitalize font-semibold">
                    {user.role.replace('-', ' ')}
                  </span>
                  <span className={`px-2 py-1 rounded font-semibold ${
                    user.isActive
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </span>
                  {user.lastLogin && (
                    <span className="text-muted-dark">Last login: {new Date(user.lastLogin).toLocaleDateString()}</span>
                  )}
                </div>
              </div>
              {user.role !== 'super-admin' && (
                <div className="flex flex-col gap-2 md:items-end">
                  <select
                    value={user.role}
                    onChange={(e) => handleChangeRole(user.email, e.target.value as UserRole)}
                    className="px-3 py-1 border border-border rounded text-sm"
                  >
                    <option value="viewer">Viewer</option>
                    <option value="editor">Editor</option>
                    <option value="admin">Admin</option>
                  </select>
                  <Button
                    size="sm"
                    onClick={() => handleDeactivate(user.email)}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    {user.isActive ? 'Deactivate' : 'Inactive'}
                  </Button>
                </div>
              )}
              {user.role === 'super-admin' && (
                <div className="text-sm text-primary font-semibold">
                  Super Administrator (Cannot be modified)
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {users.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-muted-dark">No users found</p>
        </Card>
      )}
    </div>
  )
}
