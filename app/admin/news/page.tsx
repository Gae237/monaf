'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getNewsArticles, createNewsArticle, updateNewsArticle, deleteNewsArticle } from '@/lib/content-service'
import { getCurrentUser } from '@/lib/auth-service'
import { canEdit } from '@/lib/permissions'
import { supabase } from '@/lib/supabase'
import { Upload, X } from 'lucide-react'
import { type NewsArticle, type AdminUser } from '@/lib/types'

export default function NewsManagement() {
  const [articles, setArticles] = useState<any[]>([])
  const [user, setUser] = useState<AdminUser | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [mediaFiles, setMediaFiles] = useState<File[]>([])
  const [mediaPreviews, setMediaPreviews] = useState<string[]>([])
  const [formData, setFormData] = useState({
    title: '', content: '', excerpt: '', category: 'U15', isPublished: false,
  })

  const isSuperAdmin = user ? canEdit(user.role, 'news') : false

  useEffect(() => {
    setUser(getCurrentUser())
    loadArticles()
  }, [])

  const loadArticles = async () => {
    const data = await getNewsArticles()
    setArticles(data)
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
      // Upload médias si présents
      const uploadedUrls: string[] = []
      for (const file of mediaFiles) {
        const ext = file.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
        const { error } = await supabase.storage.from('news').upload(fileName, file)
        if (error) throw error
        const { data: urlData } = supabase.storage.from('news').getPublicUrl(fileName)
        uploadedUrls.push(urlData.publicUrl)
      }

      if (editingId) {
        await supabase.from('news_articles').update({
          title: formData.title,
          content: formData.content,
          excerpt: formData.excerpt,
          category: formData.category,
          is_published: formData.isPublished,
          updated_at: new Date().toISOString(),
          ...(uploadedUrls.length > 0 && { media_urls: uploadedUrls }),
        }).eq('id', editingId)
        setEditingId(null)
      } else {
        await supabase.from('news_articles').insert({
          title: formData.title,
          content: formData.content,
          excerpt: formData.excerpt,
          category: formData.category,
          is_published: formData.isPublished,
          featured_image: uploadedUrls[0] || '',
          media_urls: uploadedUrls,
          author: user?.name || 'Admin',
          published_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
      }

      await loadArticles()
      setFormData({ title: '', content: '', excerpt: '', category: 'U15', isPublished: false })
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

  const handleEdit = (article: any) => {
    if (!isSuperAdmin) return
    setFormData({
      title: article.title,
      content: article.content,
      excerpt: article.excerpt,
      category: article.category,
      isPublished: article.is_published,
    })
    setEditingId(article.id)
    setMediaFiles([])
    setMediaPreviews([])
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!isSuperAdmin) return
    if (confirm('Supprimer cet article ?')) {
      await deleteNewsArticle(id)
      await loadArticles()
    }
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Actualités & Articles</h1>
          <p className="text-muted-dark mt-1">Créer et gérer les actualités</p>
        </div>
        {isSuperAdmin && (
          <Button onClick={() => { setEditingId(null); setMediaFiles([]); setMediaPreviews([]); setShowForm(!showForm) }}
            className="bg-primary hover:bg-primary-light">
            {showForm ? 'Annuler' : 'Nouvel article'}
          </Button>
        )}
      </div>

      {!isSuperAdmin && (
        <Card className="p-4 mb-6 bg-yellow-50 border-yellow-200">
          <p className="text-yellow-800 text-sm">⚠️ Accès en lecture seule. Seuls les Super Admins peuvent gérer les actualités.</p>
        </Card>
      )}

      {showForm && isSuperAdmin && (
        <Card className="p-6 mb-8">
          <form onSubmit={handleSave} className="space-y-4">
            <input type="text" placeholder="Titre de l'article" value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded" required />
            <textarea placeholder="Contenu de l'article" value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded h-32" required />
            <textarea placeholder="Résumé court" value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded" required />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="px-4 py-2 border border-border rounded">
                {['U15','U17','Feminine','Results','Tournaments'].map(c => <option key={c}>{c}</option>)}
              </select>
              <label className="flex items-center space-x-2 px-4 py-2">
                <input type="checkbox" checked={formData.isPublished}
                  onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })} />
                <span>Publier maintenant</span>
              </label>
            </div>

            {/* Upload médias — optionnel */}
            <div>
              <label className="block font-semibold mb-2">
                Photos & Vidéos <span className="text-muted-dark text-xs font-normal">(optionnel)</span>
              </label>
              <div className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:bg-muted transition">
                <input type="file" accept="image/*" multiple
                  onChange={handleMediaChange} className="hidden" id="news-media" />
                <label htmlFor="news-media" className="cursor-pointer flex flex-col items-center gap-2">
                  <Upload size={20} className="text-muted-dark" />
                  <div className="text-sm">
                    <div className="font-semibold">Ajouter des photos</div>
                    <div className="text-muted-dark text-xs">ou glisser-déposer</div>
                  </div>
                </label>
              </div>
              {mediaPreviews.length > 0 && (
                <div className="grid grid-cols-4 md:grid-cols-6 gap-2 mt-3">
                  {mediaPreviews.map((preview, idx) => (
                    <div key={idx} className="relative group">
                      {mediaFiles[idx]?.type.startsWith('video/') ? (
                        <div className="h-20 bg-gray-200 rounded flex items-center justify-center">
                          <span className="text-xl">🎬</span>
                        </div>
                      ) : (
                        // Remplace le bloc conditionnel video/image par :
                        <img src={preview} alt="" className="h-20 w-full object-cover rounded" />
                      )}
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
              {uploading ? 'Sauvegarde en cours...' : editingId ? "Modifier l'article" : "Créer l'article"}
            </Button>
          </form>
        </Card>
      )}

      <div className="space-y-4">
        {articles.map((article) => (
          <Card key={article.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                {/* Aperçu image si disponible */}
                
                {article.media_urls?.[0] && (
                <img src={article.media_urls[0]} alt={article.title}
                  className="w-full h-40 object-cover rounded mb-3" />
                )}
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-bold text-lg">{article.title}</h3>
                  <span className={`px-2 py-1 text-xs rounded font-semibold ${
                    article.is_published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {article.is_published ? 'Publié' : 'Brouillon'}
                  </span>
                </div>
                <p className="text-sm text-muted-dark mb-2">{article.excerpt}</p>
                <div className="flex gap-2 text-xs text-muted-dark">
                  <span>Catégorie : {article.category}</span>
                  <span>Par : {article.author}</span>
                  {article.media_urls?.length > 0 && (
                    <span>📎 {article.media_urls.length} média(s)</span>
                  )}
                </div>
              </div>
              {isSuperAdmin && (
                <div className="flex gap-2 ml-4">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(article)}>Modifier</Button>
                  <Button size="sm" variant="outline" onClick={() => handleDelete(article.id)} className="text-red-600">Supprimer</Button>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {articles.length === 0 && !showForm && (
        <Card className="p-12 text-center">
          <p className="text-muted-dark mb-4">Aucun article</p>
          {isSuperAdmin && (
            <Button onClick={() => setShowForm(true)} className="bg-primary hover:bg-primary-light">
              Créer le premier article
            </Button>
          )}
        </Card>
      )}
    </div>
  )
}