'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getEvents, deleteEvent } from '@/lib/content-service'
import { getCurrentUser } from '@/lib/auth-service'
import { canEdit } from '@/lib/permissions'
import { supabase } from '@/lib/supabase'
import { Upload, X } from 'lucide-react'
import { type AdminUser } from '@/lib/types'

export default function EventsManagement() {
  const [events, setEvents] = useState<any[]>([])
  const [user, setUser] = useState<AdminUser | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [mediaFiles, setMediaFiles] = useState<File[]>([])
  const [mediaPreviews, setMediaPreviews] = useState<string[]>([])
  const [formData, setFormData] = useState({
    title: '', description: '', date: '', location: '', category: 'U12', status: 'active' as const,
  })

  const isSuperAdmin = user ? canEdit(user.role, 'events') : false

  useEffect(() => {
    setUser(getCurrentUser())
    loadEvents()
  }, [])

  const loadEvents = async () => {
    const data = await getEvents()
    setEvents(data)
  }

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const files = Array.from(e.target.files)
    setMediaFiles(prev => [...prev, ...files])
    setMediaPreviews(prev => [...prev, ...files.map(f => URL.createObjectURL(f))])
  }

  const removeMedia = (index: number) => {
    setMediaFiles(prev => prev.filter((_, i) => i !== index))
    setMediaPreviews(prev => prev.filter((_, i) => i !== index))
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isSuperAdmin) return
    setUploading(true)

    try {
      const uploadedUrls: string[] = []
      for (const file of mediaFiles) {
        const ext = file.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
        const { error } = await supabase.storage.from('events').upload(fileName, file)
        if (error) throw error
        const { data: urlData } = supabase.storage.from('events').getPublicUrl(fileName)
        uploadedUrls.push(urlData.publicUrl)
      }

      if (editingId) {
        await supabase.from('events').update({
          title: formData.title,
          description: formData.description,
          date: formData.date,
          location: formData.location,
          category: formData.category,
          status: formData.status,
          ...(uploadedUrls.length > 0 && { media_urls: uploadedUrls }),
        }).eq('id', editingId)
        setEditingId(null)
      } else {
        await supabase.from('events').insert({
          title: formData.title,
          description: formData.description,
          date: formData.date,
          location: formData.location,
          category: formData.category,
          status: formData.status,
          poster_image: uploadedUrls[0] || '',
          media_urls: uploadedUrls,
          created_by: user?.name || 'Admin',
        })
      }

      await loadEvents()
      setFormData({ title: '', description: '', date: '', location: '', category: 'U12', status: 'active' })
      setMediaFiles([])
      setMediaPreviews([])
      setShowForm(false)
    } catch (err) {
      console.error(err)
      alert("Erreur lors de la sauvegarde")
    } finally {
      setUploading(false)
    }
  }

  const handleEdit = (event: any) => {
    if (!isSuperAdmin) return
    setFormData({
      title: event.title,
      description: event.description,
      date: typeof event.date === 'string' ? event.date.split('T')[0] : new Date(event.date).toISOString().split('T')[0],
      location: event.location,
      category: event.category,
      status: event.status ?? 'active',
    })
    setEditingId(event.id)
    setMediaFiles([])
    setMediaPreviews([])
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!isSuperAdmin) return
    if (confirm('Supprimer cet événement ?')) {
      await deleteEvent(id)
      await loadEvents()
    }
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestion des Événements</h1>
          <p className="text-muted-dark mt-1">Créer des tournois, matchs et annonces</p>
        </div>
        {isSuperAdmin && (
          <Button onClick={() => { setEditingId(null); setMediaFiles([]); setMediaPreviews([]); setShowForm(!showForm) }}
            className="bg-primary hover:bg-primary-light">
            {showForm ? 'Annuler' : 'Nouvel événement'}
          </Button>
        )}
      </div>

      {!isSuperAdmin && (
        <Card className="p-4 mb-6 bg-yellow-50 border-yellow-200">
          <p className="text-yellow-800 text-sm">⚠️ Accès en lecture seule. Seuls les Super Admins peuvent gérer les événements.</p>
        </Card>
      )}

      {showForm && isSuperAdmin && (
        <Card className="p-6 mb-8">
          <form onSubmit={handleSave} className="space-y-4">
            <input type="text" placeholder="Titre de l'événement" value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded" required />
            <textarea placeholder="Description" value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded" required />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="date" value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="px-4 py-2 border border-border rounded" required />
              <input type="text" placeholder="Lieu" value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="px-4 py-2 border border-border rounded" required />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="px-4 py-2 border border-border rounded">
                {['U8','U10','U12','U15','U17'].map(c => <option key={c}>{c}</option>)}
              </select>
              <select value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="px-4 py-2 border border-border rounded">
                <option value="active">Actif</option>
                <option value="cancelled">Annulé</option>
                <option value="completed">Terminé</option>
              </select>
            </div>

            {/* Upload médias — optionnel */}
            <div>
              <label className="block font-semibold mb-2">
                Photos <span className="text-muted-dark text-xs font-normal">(optionnel)</span>
              </label>
              <div className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:bg-muted transition">
                <input type="file" accept="image/*" multiple
                    onChange={handleMediaChange} className="hidden" id="events-media" />
                <label htmlFor="events-media" className="cursor-pointer flex flex-col items-center gap-2">
                  <Upload size={20} className="text-muted-dark" />
                  <div className="text-sm">
                    <div className="font-semibold">Ajouter des photos/vidéos</div>
                    <div className="text-muted-dark text-xs">ou glisser-déposer</div>
                  </div>
                </label>
              </div>
              {mediaPreviews.length > 0 && (
                <div className="grid grid-cols-4 md:grid-cols-6 gap-2 mt-3">
                  {mediaPreviews.map((preview, idx) => (
                    <div key={idx} className="relative group">
                    <img src={preview} alt="" className="h-20 w-full object-cover rounded" />
                  <button type="button" onClick={() => removeMedia(idx)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition">
                    <X size={12} />
                  </button>
                </div>
                  ))}
                </div>
              )}
            </div>

            <Button type="submit" disabled={uploading} className="w-full bg-primary hover:bg-primary-light">
              {uploading ? 'Sauvegarde en cours...' : editingId ? "Modifier l'événement" : "Créer l'événement"}
            </Button>
          </form>
        </Card>
      )}

      <div className="space-y-4">
        {events.map((event) => (
          <Card key={event.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                {event.media_urls?.[0] && (
                  <img src={event.media_urls[0]} alt={event.title}
                    className="w-full h-40 object-cover rounded mb-3" />
                )}
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-bold text-lg">{event.title}</h3>
                  <span className={`px-2 py-1 text-xs rounded font-semibold ${
                    event.status === 'active' ? 'bg-green-100 text-green-700'
                    : event.status === 'cancelled' ? 'bg-red-100 text-red-700'
                    : 'bg-gray-100 text-gray-700'
                  }`}>
                    {event.status === 'active' ? 'Actif' : event.status === 'cancelled' ? 'Annulé' : 'Terminé'}
                  </span>
                </div>
                <p className="text-sm text-muted-dark mb-2">{event.description}</p>
                <div className="flex flex-wrap gap-3 text-xs text-muted-dark">
                  <span>📅 {new Date(event.date).toLocaleDateString('fr-FR')}</span>
                  <span>📍 {event.location}</span>
                  <span>Catégorie : {event.category}</span>
                  {event.media_urls?.length > 0 && (
                    <span>📎 {event.media_urls.length} média(s)</span>
                  )}
                </div>
              </div>
              {isSuperAdmin && (
                <div className="flex gap-2 ml-4">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(event)}>Modifier</Button>
                  <Button size="sm" variant="outline" onClick={() => handleDelete(event.id)} className="text-red-600">Supprimer</Button>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {events.length === 0 && !showForm && (
        <Card className="p-12 text-center">
          <p className="text-muted-dark mb-4">Aucun événement créé</p>
          {isSuperAdmin && (
            <Button onClick={() => setShowForm(true)} className="bg-primary hover:bg-primary-light">
              Créer le premier événement
            </Button>
          )}
        </Card>
      )}
    </div>
  )
}