'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

type CategoryType = 'all' | string

export default function News() {
  const [articles, setArticles] = useState<any[]>([])
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => { loadArticles() }, [])

  const loadArticles = async () => {
    const { data, error } = await supabase
      .from('news_articles')
      .select('*')
      .eq('is_published', true)
      .order('published_at', { ascending: false })
    if (!error) setArticles(data || [])
    setLoading(false)
  }

  const categories = [
    { value: 'all', label: 'Toutes les actualités' },
    { value: 'U15', label: 'U15' },
    { value: 'U17', label: 'U17' },
    { value: 'Feminine', label: 'Féminin' },
    { value: 'Results', label: 'Résultats' },
    { value: 'Tournaments', label: 'Tournois' },
  ]

  const filtered = activeCategory === 'all'
    ? articles
    : articles.filter(a => a.category === activeCategory)

  return (
    <div className="min-h-screen">
      <div className="hero-section py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Actualités & Résultats</h1>
          <p className="text-xl text-gray-100">
            Restez informé des dernières nouvelles et annonces de l'OMSA
          </p>
        </div>
      </div>

      <div className="bg-muted border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button key={cat.value} onClick={() => setActiveCategory(cat.value)}
                className={`px-4 py-2 rounded transition ${
                  activeCategory === cat.value
                    ? 'bg-primary text-white'
                    : 'bg-white text-foreground hover:bg-border'
                }`}>
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-dark">Chargement...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-dark text-lg">Aucune actualité dans cette catégorie</p>
          </div>
        ) : (
          <div className="space-y-8">
            {filtered.map(article => (
              <article key={article.id} className="bg-white border border-border rounded-lg overflow-hidden card-hover">
                {/* Image principale */}
                {article.media_urls?.[0] && (
                  <img src={article.media_urls[0]} alt={article.title}
                    className="w-full h-64 object-cover" />
                )}
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-bold bg-primary text-white px-3 py-1 rounded">
                      {article.category}
                    </span>
                    <span className="text-sm text-muted-dark">
                      {article.published_at
                        ? new Date(article.published_at).toLocaleDateString('fr-FR')
                        : ''}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold mb-3 text-primary">{article.title}</h2>
                  <p className="text-muted-dark mb-4 leading-relaxed">{article.excerpt}</p>
                  <p className="text-foreground leading-relaxed mb-4">{article.content}</p>

                  {/* Photos supplémentaires */}
                  {article.media_urls?.length > 1 && (
                    <div className="grid grid-cols-3 gap-2 mt-4">
                      {article.media_urls.slice(1).map((url: string, idx: number) => (
                        <div key={idx} className="rounded overflow-hidden aspect-square bg-muted">
                          <img src={url} alt={`Photo ${idx + 2}`}
                            className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  )}

                  <p className="text-sm text-muted-dark mt-4">Par : {article.author}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}