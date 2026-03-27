'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getGalleries, createGallery, updateGallery, deleteGallery } from '@/lib/content-service'
import { type Gallery } from '@/lib/types'

export default function GalleryManagement() {
  const [galleries, setGalleries] = useState<Gallery[]>([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    season: '2024-2025',
    category: 'U12',
    isPublic: true,
  })

  useEffect(() => {
    loadGalleries()
  }, [])

  const loadGalleries = () => {
    setGalleries(getGalleries())
  }

  const handleCreateGallery = (e: React.FormEvent) => {
    e.preventDefault()
    const newGallery = createGallery({
      title: formData.title,
      description: formData.description,
      images: [],
      season: formData.season,
      category: formData.category,
      isPublic: formData.isPublic,
    })
    setGalleries([...galleries, newGallery])
    setFormData({ title: '', description: '', season: '2024-2025', category: 'U12', isPublic: true })
    setShowForm(false)
  }

  const handleDeleteGallery = (id: string) => {
    if (confirm('Are you sure you want to delete this gallery?')) {
      deleteGallery(id)
      loadGalleries()
    }
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gallery Management</h1>
          <p className="text-muted-dark mt-1">Upload and organize photos and videos</p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-primary hover:bg-primary-light"
        >
          {showForm ? 'Cancel' : 'Create Album'}
        </Button>
      </div>

      {showForm && (
        <Card className="p-6 mb-8">
          <form onSubmit={handleCreateGallery} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Album Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="px-4 py-2 border border-border rounded"
                required
              />
              <select
                value={formData.season}
                onChange={(e) => setFormData({ ...formData, season: e.target.value })}
                className="px-4 py-2 border border-border rounded"
              >
                <option value="2023-2024">2023-2024</option>
                <option value="2024-2025">2024-2025</option>
                <option value="2025-2026">2025-2026</option>
              </select>
            </div>
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded"
              rows={3}
            />
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.isPublic}
                  onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
                />
                <span>Make Public</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="px-4 py-2 border border-border rounded"
              >
                <option value="U8">U8</option>
                <option value="U10">U10</option>
                <option value="U12">U12</option>
                <option value="U13">U13</option>
                <option value="U15">U15</option>
                <option value="U17">U17</option>
              </select>
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary-light">
              Create Album
            </Button>
          </form>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleries.map((gallery) => (
          <Card key={gallery.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="mb-4 h-40 bg-muted rounded flex items-center justify-center">
              <span className="text-4xl">📸</span>
            </div>
            <h3 className="font-bold text-lg text-foreground mb-2">{gallery.title}</h3>
            <p className="text-sm text-muted-dark mb-3 line-clamp-2">{gallery.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                {gallery.season}
              </span>
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                {gallery.category}
              </span>
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                {gallery.isPublic ? 'Public' : 'Private'}
              </span>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="flex-1">
                Edit
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleDeleteGallery(gallery.id)}
                className="flex-1 text-red-600"
              >
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {galleries.length === 0 && !showForm && (
        <Card className="p-12 text-center">
          <p className="text-muted-dark mb-4">No galleries created yet</p>
          <Button onClick={() => setShowForm(true)} className="bg-primary hover:bg-primary-light">
            Create Your First Album
          </Button>
        </Card>
      )}
    </div>
  )
}
