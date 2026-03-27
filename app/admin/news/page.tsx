'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getNewsArticles, createNewsArticle, updateNewsArticle, deleteNewsArticle } from '@/lib/content-service'
import { type NewsArticle } from '@/lib/types'

export default function NewsManagement() {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: 'U15',
    isPublished: false,
  })

  useEffect(() => {
    loadArticles()
  }, [])

  const loadArticles = () => {
    setArticles(getNewsArticles())
  }

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingId) {
      updateNewsArticle(editingId, {
        ...formData,
        publishedAt: new Date(),
        updatedAt: new Date(),
      } as any)
      setEditingId(null)
    } else {
      createNewsArticle({
        ...formData,
        featuredImage: '/news-collage.png',
        author: 'Admin',
        publishedAt: new Date(),
        updatedAt: new Date(),
      } as any)
    }
    loadArticles()
    setFormData({ title: '', content: '', excerpt: '', category: 'U15', isPublished: false })
    setShowForm(false)
  }

  const handleEdit = (article: NewsArticle) => {
    setFormData({
      title: article.title,
      content: article.content,
      excerpt: article.excerpt,
      category: article.category,
      isPublished: article.isPublished,
    })
    setEditingId(article.id)
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    if (confirm('Delete this article?')) {
      deleteNewsArticle(id)
      loadArticles()
    }
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">News & Articles</h1>
          <p className="text-muted-dark mt-1">Create and manage news content</p>
        </div>
        <Button
          onClick={() => {
            setEditingId(null)
            setFormData({ title: '', content: '', excerpt: '', category: 'U15', isPublished: false })
            setShowForm(!showForm)
          }}
          className="bg-primary hover:bg-primary-light"
        >
          {showForm ? 'Cancel' : 'New Article'}
        </Button>
      </div>

      {showForm && (
        <Card className="p-6 mb-8">
          <form onSubmit={handleSaveArticle} className="space-y-4">
            <input
              type="text"
              placeholder="Article Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded"
              required
            />
            <textarea
              placeholder="Article Content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded h-32"
              required
            />
            <textarea
              placeholder="Excerpt (short summary)"
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded"
              required
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="px-4 py-2 border border-border rounded"
              >
                <option value="U15">U15</option>
                <option value="U17">U17</option>
                <option value="Feminine">Feminine</option>
                <option value="Results">Results</option>
                <option value="Tournaments">Tournaments</option>
              </select>
              <label className="flex items-center space-x-2 px-4 py-2">
                <input
                  type="checkbox"
                  checked={formData.isPublished}
                  onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                />
                <span>Publish Now</span>
              </label>
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary-light">
              {editingId ? 'Update Article' : 'Create Article'}
            </Button>
          </form>
        </Card>
      )}

      <div className="space-y-4">
        {articles.map((article) => (
          <Card key={article.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-bold text-lg text-foreground">{article.title}</h3>
                  <span className={`px-2 py-1 text-xs rounded font-semibold ${
                    article.isPublished
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {article.isPublished ? 'Published' : 'Draft'}
                  </span>
                </div>
                <p className="text-sm text-muted-dark mb-2">{article.excerpt}</p>
                <div className="flex gap-2 text-xs">
                  <span className="text-muted-dark">Category: {article.category}</span>
                  <span className="text-muted-dark">By: {article.author}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(article)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(article.id)}
                  className="text-red-600"
                >
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {articles.length === 0 && !showForm && (
        <Card className="p-12 text-center">
          <p className="text-muted-dark mb-4">No articles yet</p>
          <Button onClick={() => setShowForm(true)} className="bg-primary hover:bg-primary-light">
            Create Your First Article
          </Button>
        </Card>
      )}
    </div>
  )
}
