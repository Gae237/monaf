'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getStaffMembers, deleteStaffMember } from '@/lib/content-service'
import { getCurrentUser } from '@/lib/auth-service'
import { canEdit } from '@/lib/permissions'
import { supabase } from '@/lib/supabase'
import { Upload, X } from 'lucide-react'
import { type AdminUser } from '@/lib/types'

export default function StaffManagement() {
  const [staff, setStaff] = useState<any[]>([])
  const [user, setUser] = useState<AdminUser | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string>('')
  const [formData, setFormData] = useState({
    name: '', position: '', email: '', phone: '', role: 'Coach',
  })

  const isSuperAdmin = user ? canEdit(user.role, 'staff') : false

  useEffect(() => {
    setUser(getCurrentUser())
    loadStaff()
  }, [])

  const loadStaff = async () => {
    const { data } = await supabase
      .from('staff_members')
      .select('*')
      .order('created_at', { ascending: true })
    setStaff(data || [])
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0]
      setPhotoFile(file)
      setPhotoPreview(URL.createObjectURL(file))
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isSuperAdmin) return
    setUploading(true)

    try {
      let photoUrl = ''

      if (photoFile) {
        const ext = photoFile.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
        const { error } = await supabase.storage.from('staff').upload(fileName, photoFile)
        if (error) throw error
        const { data: urlData } = supabase.storage.from('staff').getPublicUrl(fileName)
        photoUrl = urlData.publicUrl
      }

      if (editingId) {
        await supabase.from('staff_members').update({
          name: formData.name,
          position: formData.position,
          email: formData.email,
          phone: formData.phone,
          role: formData.role,
          ...(photoUrl && { photo_url: photoUrl }),
          updated_at: new Date().toISOString(),
        }).eq('id', editingId)
        setEditingId(null)
      } else {
        await supabase.from('staff_members').insert({
          name: formData.name,
          position: formData.position,
          email: formData.email,
          phone: formData.phone,
          role: formData.role,
          photo_url: photoUrl,
        })
      }

      await loadStaff()
      setFormData({ name: '', position: '', email: '', phone: '', role: 'Coach' })
      setPhotoFile(null)
      setPhotoPreview('')
      setShowForm(false)
    } catch (err) {
      console.error(err)
      alert("Erreur lors de la sauvegarde")
    } finally {
      setUploading(false)
    }
  }

  const handleEdit = (member: any) => {
    if (!isSuperAdmin) return
    setFormData({
      name: member.name,
      position: member.position,
      email: member.email,
      phone: member.phone,
      role: member.role,
    })
    setPhotoPreview(member.photo_url || '')
    setPhotoFile(null)
    setEditingId(member.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!isSuperAdmin) return
    if (confirm('Supprimer ce membre du staff ?')) {
      await deleteStaffMember(id)
      await loadStaff()
    }
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestion du Staff</h1>
          <p className="text-muted-dark mt-1">Gérer les membres de l'équipe</p>
        </div>
        {isSuperAdmin && (
          <Button onClick={() => {
            setEditingId(null)
            setFormData({ name: '', position: '', email: '', phone: '', role: 'Coach' })
            setPhotoFile(null)
            setPhotoPreview('')
            setShowForm(!showForm)
          }} className="bg-primary hover:bg-primary-light">
            {showForm ? 'Annuler' : 'Ajouter un membre'}
          </Button>
        )}
      </div>

      {!isSuperAdmin && (
        <Card className="p-4 mb-6 bg-yellow-50 border-yellow-200">
          <p className="text-yellow-800 text-sm">⚠️ Accès en lecture seule. Seuls les Super Admins peuvent gérer le staff.</p>
        </Card>
      )}

      {showForm && isSuperAdmin && (
        <Card className="p-6 mb-8">
          <form onSubmit={handleSave} className="space-y-4">
            {/* Photo upload */}
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-muted border-2 border-border flex items-center justify-center flex-shrink-0">
                {photoPreview ? (
                  <img src={photoPreview} alt="Preview"
                    className="w-full h-full object-cover" />
                ) : (
                  <span className="text-3xl">👤</span>
                )}
              </div>
              <div className="flex-1">
                <label className="block font-semibold mb-2">
                  Photo du membre <span className="text-muted-dark text-xs font-normal">(optionnel)</span>
                </label>
                <div className="border-2 border-dashed border-border rounded-lg p-3 text-center hover:bg-muted transition">
                  <input type="file" accept="image/*"
                    onChange={handlePhotoChange} className="hidden" id="staff-photo" />
                  <label htmlFor="staff-photo" className="cursor-pointer flex items-center justify-center gap-2">
                    <Upload size={16} className="text-muted-dark" />
                    <span className="text-sm">
                      {photoFile ? photoFile.name : 'Choisir une photo'}
                    </span>
                  </label>
                </div>
                {photoPreview && (
                  <button type="button" onClick={() => { setPhotoFile(null); setPhotoPreview('') }}
                    className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <X size={12} /> Supprimer la photo
                  </button>
                )}
              </div>
            </div>

            <input type="text" placeholder="Nom complet" value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded" required />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Poste/Titre" value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className="px-4 py-2 border border-border rounded" required />
              <select value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="px-4 py-2 border border-border rounded">
                {['Coach','Assistant Coach','Physio','Manager','Admin'].map(r => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="email" placeholder="Email" value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="px-4 py-2 border border-border rounded" required />
              <input type="tel" placeholder="Téléphone" value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="px-4 py-2 border border-border rounded" required />
            </div>

            <Button type="submit" disabled={uploading} className="w-full bg-primary hover:bg-primary-light">
              {uploading ? 'Sauvegarde...' : editingId ? 'Modifier le membre' : 'Ajouter le membre'}
            </Button>
          </form>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {staff.map((member) => (
          <Card key={member.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="mb-4 h-48 bg-muted rounded-lg overflow-hidden flex items-center justify-center">
              {member.photo_url ? (
                <img src={member.photo_url} alt={member.name}
                  className="w-full h-full object-cover" />
              ) : (
                <span className="text-5xl">👤</span>
              )}
            </div>
            <h3 className="font-bold text-lg mb-1">{member.name}</h3>
            <p className="text-sm text-primary font-semibold mb-3">{member.position}</p>
            <div className="space-y-1 text-xs text-muted-dark mb-4">
              <p>📧 {member.email}</p>
              <p>📞 {member.phone}</p>
              <p>Rôle : {member.role}</p>
            </div>
            {isSuperAdmin && (
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleEdit(member)} className="flex-1">
                  Modifier
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleDelete(member.id)}
                  className="flex-1 text-red-600">
                  Supprimer
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>

      {staff.length === 0 && !showForm && (
        <Card className="p-12 text-center">
          <p className="text-muted-dark mb-4">Aucun membre du staff</p>
          {isSuperAdmin && (
            <Button onClick={() => setShowForm(true)} className="bg-primary hover:bg-primary-light">
              Ajouter le premier membre
            </Button>
          )}
        </Card>
      )}
    </div>
  )
}