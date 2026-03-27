'use client'

import { useState } from 'react'

type FilterType = 'all' | 'photos' | 'videos'
type SeasonType = 'all' | '2023-2024' | '2024-2025'
type CategoryType = 'all' | 'U8' | 'U10' | 'U12' | 'U13' | 'U14' | 'U15' | 'U16' | 'U17' | 'U18'

export default function Gallery() {
  const [mediaType, setMediaType] = useState<FilterType>('all')
  const [season, setSeason] = useState<SeasonType>('all')
  const [category, setCategory] = useState<CategoryType>('all')

  const galleryItems = [
    { id: 1, type: 'photo', season: '2024-2025', category: 'U16', title: 'Training Session', query: 'youth football training' },
    { id: 2, type: 'video', season: '2024-2025', category: 'U18', title: 'Tournament Highlights', query: 'football match highlights' },
    { id: 3, type: 'photo', season: '2024-2025', category: 'U14', title: 'Match Action', query: 'football players in action' },
    { id: 4, type: 'photo', season: '2023-2024', category: 'U12', title: 'Team Celebration', query: 'youth football celebration' },
    { id: 5, type: 'video', season: '2023-2024', category: 'U15', title: 'Skills Development', query: 'football skill training' },
    { id: 6, type: 'photo', season: '2024-2025', category: 'U10', title: 'Academy Facility', query: 'modern football academy' },
    { id: 7, type: 'photo', season: '2024-2025', category: 'U13', title: 'Girls Training', query: 'female football training' },
    { id: 8, type: 'video', season: '2024-2025', category: 'U17', title: 'Cadets Tournament', query: 'football tournament' },
  ]

  const filtered = galleryItems.filter(item => {
    const typeMatch = mediaType === 'all' || item.type === mediaType
    const seasonMatch = season === 'all' || item.season === season
    const categoryMatch = category === 'all' || item.category === category
    return typeMatch && seasonMatch && categoryMatch
  })

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="hero-section py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Gallery</h1>
          <p className="text-xl text-gray-100">
            Moments from our training, tournaments, and academy life
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="space-y-6">
          <div>
            <h3 className="font-bold mb-3">Filter by Type</h3>
            <div className="flex flex-wrap gap-3">
              {['all', 'photos', 'videos'].map(type => (
                <button
                  key={type}
                  onClick={() => setMediaType(type as FilterType)}
                  className={`px-4 py-2 rounded capitalize transition ${
                    mediaType === type
                      ? 'bg-primary text-white'
                      : 'bg-muted text-foreground hover:bg-border'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-3">Filter by Season</h3>
            <div className="flex flex-wrap gap-3">
              {['all', '2023-2024', '2024-2025'].map(s => (
                <button
                  key={s}
                  onClick={() => setSeason(s as SeasonType)}
                  className={`px-4 py-2 rounded capitalize transition ${
                    season === s
                      ? 'bg-primary text-white'
                      : 'bg-muted text-foreground hover:bg-border'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-3">Filter by Category</h3>
            <div className="flex flex-wrap gap-3">
              {['all', 'U8', 'U10', 'U12', 'U13', 'U14', 'U15', 'U16', 'U17', 'U18'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat as CategoryType)}
                  className={`px-4 py-2 rounded capitalize transition ${
                    category === cat
                      ? 'bg-primary text-white'
                      : 'bg-muted text-foreground hover:bg-border'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-dark text-lg">No items found matching your filters</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(item => (
              <div key={item.id} className="bg-gray-300 rounded-lg overflow-hidden card-hover group cursor-pointer h-72">
                {item.type === 'video' ? (
                  <div className="w-full h-full relative">
                    <img 
                      src={`/.jpg?height=600&width=600&query=${item.query}`}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/60 transition">
                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                        <div className="w-0 h-0 border-l-8 border-l-primary border-t-5 border-t-transparent border-b-5 border-b-transparent ml-1"></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <img 
                    src={`/.jpg?height=600&width=600&query=${item.query}`}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-4">
                  <div className="text-white">
                    <h3 className="font-bold">{item.title}</h3>
                    <p className="text-sm text-gray-200">{item.category} • {item.season}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
