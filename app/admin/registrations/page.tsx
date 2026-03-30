'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getPlayerRegistrations, updatePlayerRegistration } from '@/lib/content-service'

export default function RegistrationsManagement() {
  const [registrations, setRegistrations] = useState<any[]>([])
  const [filter, setFilter] = useState({ status: 'all', category: 'all' })
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => { loadRegistrations() }, [])

  const loadRegistrations = async () => {
    const data = await getPlayerRegistrations()
    setRegistrations(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  const handleApprove = async (id: string) => {
    await updatePlayerRegistration(id, { status: 'approved' } as any)
    await loadRegistrations()
  }

  const handleReject = async (id: string) => {
    await updatePlayerRegistration(id, { status: 'rejected' } as any)
    await loadRegistrations()
  }

  const filteredRegistrations = registrations.filter((reg) => {
    const statusMatch = filter.status === 'all' || reg.status === filter.status
    const categoryMatch = filter.category === 'all' || reg.category === filter.category
    const searchMatch =
      reg.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.email?.toLowerCase().includes(searchTerm.toLowerCase())
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
        <h1 className="text-3xl font-bold text-foreground">Inscriptions des joueurs</h1>
        <p className="text-muted-dark mt-1">Examiner et gérer les candidatures</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="p-4">
          <h3 className="text-sm font-medium text-muted-dark">Total</h3>
          <p className="text-3xl font-bold text-primary">{stats.total}</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-medium text-muted-dark">En attente</h3>
          <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-medium text-muted-dark">Approuvées</h3>
          <p className="text-3xl font-bold text-green-600">{stats.approved}</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-medium text-muted-dark">Rejetées</h3>
          <p className="text-3xl font-bold text-red-600">{stats.rejected}</p>
        </Card>
      </div>

      <Card className="p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input type="text" placeholder="Rechercher par nom ou email..."
            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-border rounded col-span-2" />
          <select value={filter.status}
            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
            className="px-4 py-2 border border-border rounded">
            <option value="all">Tous les statuts</option>
            <option value="pending">En attente</option>
            <option value="approved">Approuvé</option>
            <option value="rejected">Rejeté</option>
          </select>
          <select value={filter.category}
            onChange={(e) => setFilter({ ...filter, category: e.target.value })}
            className="px-4 py-2 border border-border rounded">
            <option value="all">Toutes catégories</option>
            {['U8','U10','U12','U15','U17'].map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
      </Card>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-muted-dark">Chargement...</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredRegistrations.map((reg) => (
            <Card key={reg.id} className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    {reg.photo_url ? (
                      <img src={reg.photo_url}
                        alt={`${reg.first_name} ${reg.last_name}`}
                        className="w-16 h-16 rounded-full object-cover border-2 border-primary" />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center border-2 border-border">
                        <span className="text-2xl">👤</span>
                      </div>
                    )}
                    <div>
                      <h3 className="font-bold text-lg">
                        {reg.first_name} {reg.last_name}
                      </h3>
                      <p className="text-xs text-muted-dark">
                        Inscrit le : {reg.registered_at
                          ? new Date(reg.registered_at).toLocaleDateString('fr-FR')
                          : '-'}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm text-muted-dark">
                    <span>📧 {reg.email}</span>
                    <span>📞 {reg.phone}</span>
                    <span>🎂 {reg.date_of_birth
                      ? new Date(reg.date_of_birth).toLocaleDateString('fr-FR')
                      : '-'}
                    </span>
                    <span>Catégorie : {reg.category}</span>
                    <span>Programme : {reg.program_type || '-'}</span>
                  </div>
                  {reg.notes && (
                    <p className="text-sm text-muted-dark mt-2 italic">Notes : {reg.notes}</p>
                  )}
                </div>
                <div className="flex flex-col gap-2 md:items-end">
                  <span className={`px-3 py-1 text-sm rounded font-semibold ${
                    reg.status === 'pending' ? 'bg-yellow-100 text-yellow-700'
                    : reg.status === 'approved' ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                  }`}>
                    {reg.status === 'pending' ? 'En attente'
                      : reg.status === 'approved' ? 'Approuvé'
                      : 'Rejeté'}
                  </span>
                  {reg.status === 'pending' && (
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => handleApprove(reg.id)}
                        className="bg-green-600 hover:bg-green-700">Approuver</Button>
                      <Button size="sm" onClick={() => handleReject(reg.id)}
                        className="bg-red-600 hover:bg-red-700">Rejeter</Button>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
          {filteredRegistrations.length === 0 && (
            <Card className="p-12 text-center">
              <p className="text-muted-dark">Aucune inscription trouvée</p>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}