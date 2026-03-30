'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getGalleries, createGallery, deleteGallery } from '@/lib/content-service'
import { getCurrentUser } from '@/lib/auth-service'
import { canEdit } from '@/lib/permissions'
import { supabase } from '@/lib/supabase'
import { Upload, X } from 'lucide-react'
import { type AdminUser } from '@/lib/types'

export default function GalleryManagement() {
  const [galleries, setGalleries] = useState<any[]>([])
  const [user, setUser] = useState<AdminUser | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [mediaFiles, setMediaFiles] = useState<File[]>([])
  const [mediaPreviews, setMediaPreviews] = useState<string[]>([])
  const [formData, setFormData] = useState({
    title: '', description: '', season: '2024-2025', category: 'U12', isPublic: true,
  })

  const isSuperAdmin = user ? canEdit(user.role, 'gallery') : false

  useEffect(() => {
    setUser(getCurrentUser())
    loadGalleries()
  }, [])

  const loadGalleries = async () => {
    const data = await getGalleries()
    setGalleries(data)
  }

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const files = Array.from(e.target.files)
    setMediaFiles(prev => [...prev, ...files])
    const previews = files.map(f => URL.createObjectURL(f))
    setMediaPreviews(prev => [...prev, ...previews])
  }

  const removeMedia = (index: number) => {
    setMediaFiles(prev => prev.filter((_, i) => i !== index))
    setMediaPreviews(prev => prev.filter((_, i) => i !== index))
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isSuperAdmin) return
    setUploading(true)

    try {
      // Upload tous les fichiers
      const uploadedUrls: string[] = []
      for (const file of mediaFiles) {
        const ext = file.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
        const { error } = await supabase.storage.from('gallery').upload(fileName, file)
        if (error) throw error
        const { data: urlData } = supabase.storage.from('gallery').getPublicUrl(fileName)
        uploadedUrls.push(urlData.publicUrl)
      }

      // Créer la galerie avec les URLs
      await supabase.from('galleries').insert({
        title: formData.title,
        description: formData.description,
        season: formData.season,
        category: formData.category,
        is_public: formData.isPublic,
        media_urls: uploadedUrls,
      })

      await loadGalleries()
      setFormData({ title: '', description: '', season: '2024-2025', category: 'U12', isPublic: true })
      setMediaFiles([])
      setMediaPreviews([])
      setShowForm(false)
    } catch (err) {
      console.error(err)
      alert("Erreur lors de l'upload")
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!isSuperAdmin) return
    if (confirm('Supprimer cet album ?')) {
      await deleteGallery(id)
      await loadGalleries()
    }
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestion de la Galerie</h1>
          <p className="text-muted-dark mt-1">Créer et organiser photos et vidéos</p>
        </div>
        {isSuperAdmin && (
          <Button onClick={() => setShowForm(!showForm)} className="bg-primary hover:bg-primary-light">
            {showForm ? 'Annuler' : 'Créer un album'}
          </Button>
        )}
      </div>

      {!isSuperAdmin && (
        <Card className="p-4 mb-6 bg-yellow-50 border-yellow-200">
          <p className="text-yellow-800 text-sm">⚠️ Accès en lecture seule. Seuls les Super Admins peuvent gérer la galerie.</p>
        </Card>
      )}

      {showForm && isSuperAdmin && (
        <Card className="p-6 mb-8">
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Titre de l'album" value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="px-4 py-2 border border-border rounded" required />
              <select value={formData.season}
                onChange={(e) => setFormData({ ...formData, season: e.target.value })}
                className="px-4 py-2 border border-border rounded">
                <option value="2023-2024">2023-2024</option>
                <option value="2024-2025">2024-2025</option>
                <option value="2025-2026">2025-2026</option>
              </select>
            </div>
            <textarea placeholder="Description" value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded" rows={3} />
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input type="checkbox" checked={formData.isPublic}
                  onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })} />
                <span>Rendre public</span>
              </label>
              <select value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="px-4 py-2 border border-border rounded">
                {['U8','U10','U12','U13','U15','U17'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>

            {/* Upload médias */}
            <div>
              <label className="block font-semibold mb-2">Photos <span className="text-red-500">*</span></label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:bg-muted transition">
                <input type="file" accept="image/*" multiple
                  onChange={handleMediaChange} className="hidden" id="media-upload" />
                <label htmlFor="media-upload" className="cursor-pointer flex flex-col items-center gap-2">
                  <Upload size={24} className="text-muted-dark" />
                  <div className="text-sm">
                    <div className="font-semibold">Cliquer pour ajouter des photos</div>
                    <div className="text-muted-dark">ou glisser-déposer — plusieurs fichiers acceptés</div>
                  </div>
                </label>
              </div>

              {/* Prévisualisations */}
              {mediaPreviews.length > 0 && (
                <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mt-4">
                  {mediaPreviews.map((preview, idx) => (
                    <div key={idx} className="relative group">
                      <img src={preview} alt="" className="h-24 w-full object-cover rounded" />
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
              {uploading ? 'Upload en cours...' : "Créer l'album"}
            </Button>
          </form>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleries.map((gallery) => (
          <Card key={gallery.id} className="p-6 hover:shadow-lg transition-shadow">
            {/* Aperçu de la première image */}
            <div className="mb-4 h-40 bg-muted rounded overflow-hidden flex items-center justify-center">
              {gallery.media_urls?.[0] ? (
                <img src={gallery.media_urls[0]} alt={gallery.title}
                className="w-full h-full object-cover" />
                  ) : (
                <span className="text-4xl">📸</span>
          )}
            </div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-lg">{gallery.title}</h3>
              <span className="text-xs text-muted-dark">{gallery.media_urls?.length || 0} média(s)</span>
            </div>
            <p className="text-sm text-muted-dark mb-3 line-clamp-2">{gallery.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">{gallery.season}</span>
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">{gallery.category}</span>
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                {gallery.is_public ? 'Public' : 'Privé'}
              </span>
            </div>
            {isSuperAdmin && (
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleDelete(gallery.id)}
                  className="flex-1 text-red-600">Supprimer</Button>
              </div>
            )}
          </Card>
        ))}
      </div>

      {galleries.length === 0 && !showForm && (
        <Card className="p-12 text-center">
          <p className="text-muted-dark mb-4">Aucun album créé</p>
          {isSuperAdmin && (
            <Button onClick={() => setShowForm(true)} className="bg-primary hover:bg-primary-light">
              Créer le premier album
            </Button>
          )}
        </Card>
      )}
    </div>
  )
}