'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

type SeasonType = 'all' | string
type CategoryType = 'all' | string

export default function Gallery() {
  const [galleries, setGalleries] = useState<any[]>([])
  const [season, setSeason] = useState<SeasonType>('all')
  const [category, setCategory] = useState<CategoryType>('all')
  const [loading, setLoading] = useState(true)
  const [selectedGallery, setSelectedGallery] = useState<any | null>(null)

  useEffect(() => { loadGalleries() }, [])

  const loadGalleries = async () => {
    const { data, error } = await supabase
      .from('galleries')
      .select('*')
      .eq('is_public', true)
      .order('created_at', { ascending: false })
    if (!error) setGalleries(data || [])
    setLoading(false)
  }

  const filtered = galleries.filter(g => {
    const seasonMatch = season === 'all' || g.season === season
    const categoryMatch = category === 'all' || g.category === category
    return seasonMatch && categoryMatch
  })

  const seasons = ['all', '2023-2024', '2024-2025', '2025-2026']
  const categories = ['all', 'U8', 'U10', 'U12', 'U13', 'U15', 'U17']

  return (
    <div className="min-h-screen">
      <div className="hero-section py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Galerie</h1>
          <p className="text-xl text-gray-100">
            Moments de nos entraînements, tournois et vie à l'académie
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="space-y-6 mb-12">
          <div>
            <h3 className="font-bold mb-3">Filtrer par saison</h3>
            <div className="flex flex-wrap gap-3">
              {seasons.map(s => (
                <button key={s} onClick={() => setSeason(s)}
                  className={`px-4 py-2 rounded transition ${
                    season === s ? 'bg-primary text-white' : 'bg-muted text-foreground hover:bg-border'
                  }`}>
                  {s === 'all' ? 'Toutes' : s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-bold mb-3">Filtrer par catégorie</h3>
            <div className="flex flex-wrap gap-3">
              {categories.map(cat => (
                <button key={cat} onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded transition ${
                    category === cat ? 'bg-primary text-white' : 'bg-muted text-foreground hover:bg-border'
                  }`}>
                  {cat === 'all' ? 'Toutes' : cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-dark">Chargement...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-dark text-lg">Aucun album trouvé</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(gallery => (
              <div key={gallery.id}
                className="bg-white rounded-lg overflow-hidden border border-border card-hover cursor-pointer"
                onClick={() => setSelectedGallery(gallery)}>
                <div className="h-48 bg-muted overflow-hidden">
                  {gallery.media_urls?.[0] ? (
                    <img src={gallery.media_urls[0]} alt={gallery.title}
                      className="w-full h-full object-cover hover:scale-105 transition duration-300" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-5xl">📸</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-lg">{gallery.title}</h3>
                    <span className="text-xs text-muted-dark">
                      {gallery.media_urls?.length || 0} photo(s)
                    </span>
                  </div>
                  <p className="text-sm text-muted-dark mb-3 line-clamp-2">{gallery.description}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">{gallery.season}</span>
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">{gallery.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal galerie */}
      {selectedGallery && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedGallery(null)}>
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">{selectedGallery.title}</h2>
              <button onClick={() => setSelectedGallery(null)}
                className="text-2xl text-muted-dark hover:text-foreground">✕</button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {selectedGallery.media_urls?.map((url: string, idx: number) => (
                  <div key={idx} className="rounded overflow-hidden bg-muted aspect-square">
                    <img src={url} alt={`Photo ${idx + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition cursor-zoom-in" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}