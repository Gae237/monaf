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
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    email: '', name: '', password: '', role: 'editor' as UserRole,
  })
  const [error, setError] = useState('')

  useEffect(() => {
    const user = getCurrentUser()
    setCurrentUser(user)
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      const data = await getAllUsers()
      setUsers(Array.isArray(data) ? data : [])
    } catch (err) {
      setUsers([])
    } finally {
      setLoading(false)
    }
  }

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (currentUser?.role !== 'super-admin') {
      setError('Seuls les super admins peuvent créer des utilisateurs')
      return
    }
    try {
      await createUser({
        email: formData.email,
        name: formData.name,
        password: formData.password,
        role: formData.role,
        isActive: true,
      })
      await loadUsers()
      setFormData({ email: '', name: '', password: '', role: 'editor' })
      setShowForm(false)
    } catch (err) {
      setError((err as Error).message)
    }
  }

  const handleChangeRole = async (email: string, newRole: UserRole) => {
    if (currentUser?.role !== 'super-admin') return
    await updateUserRole(email, newRole)
    await loadUsers()
  }

  const handleDeactivate = async (email: string) => {
    if (currentUser?.role !== 'super-admin') return
    if (confirm('Désactiver cet utilisateur ?')) {
      await deactivateUser(email)
      await loadUsers()
    }
  }

  if (currentUser?.role !== 'super-admin') {
    return (
      <div className="p-8">
        <Card className="p-6 text-center">
          <p className="text-red-600 font-semibold">Accès refusé</p>
          <p className="text-muted-dark">Seuls les super admins peuvent accéder à cette page</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestion des utilisateurs</h1>
          <p className="text-muted-dark mt-1">Gérer les comptes et les rôles admin</p>
        </div>
        <Button onClick={() => { setError(''); setShowForm(!showForm) }}
          className="bg-primary hover:bg-primary-light">
          {showForm ? 'Annuler' : 'Créer un utilisateur'}
        </Button>
      </div>

      {showForm && (
        <Card className="p-6 mb-8">
          <form onSubmit={handleCreateUser} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="email" placeholder="Adresse email" value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="px-4 py-2 border border-border rounded" required />
              <input type="text" placeholder="Nom complet" value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="px-4 py-2 border border-border rounded" required />
            </div>
            <input type="password" placeholder="Mot de passe" value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded" required />
            <select value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
              className="w-full px-4 py-2 border border-border rounded">
              <option value="viewer">Viewer (lecture seule)</option>
              <option value="editor">Editor (actualités uniquement)</option>
              <option value="admin">Admin (la plupart des fonctions)</option>
            </select>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <Button type="submit" className="w-full bg-primary hover:bg-primary-light">
              Créer l'utilisateur
            </Button>
          </form>
        </Card>
      )}

      {loading ? (
        <div className="text-center py-12">
          <p className="text-muted-dark">Chargement...</p>
        </div>
      ) : (
        <div className="space-y-3">
          {users.map((user) => (
            <Card key={user.id} className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{user.name}</h3>
                  <p className="text-sm text-muted-dark">{user.email}</p>
                  <div className="flex gap-3 mt-2 text-xs">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded capitalize font-semibold">
                      {user.role.replace('-', ' ')}
                    </span>
                    <span className={`px-2 py-1 rounded font-semibold ${
                      user.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {user.isActive ? 'Actif' : 'Inactif'}
                    </span>
                    {user.lastLogin && (
                      <span className="text-muted-dark">
                        Dernière connexion : {new Date(user.lastLogin).toLocaleDateString('fr-FR')}
                      </span>
                    )}
                  </div>
                </div>
                {user.role !== 'super-admin' ? (
                  <div className="flex flex-col gap-2 md:items-end">
                    <select value={user.role}
                      onChange={(e) => handleChangeRole(user.email, e.target.value as UserRole)}
                      className="px-3 py-1 border border-border rounded text-sm">
                      <option value="viewer">Viewer</option>
                      <option value="editor">Editor</option>
                      <option value="admin">Admin</option>
                    </select>
                    <Button size="sm" onClick={() => handleDeactivate(user.email)}
                      className="bg-red-600 hover:bg-red-700">
                      {user.isActive ? 'Désactiver' : 'Inactif'}
                    </Button>
                  </div>
                ) : (
                  <div className="text-sm text-primary font-semibold">
                    Super Administrateur (non modifiable)
                  </div>
                )}
              </div>
            </Card>
          ))}
          {users.length === 0 && (
            <Card className="p-12 text-center">
              <p className="text-muted-dark">Aucun utilisateur trouvé</p>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}