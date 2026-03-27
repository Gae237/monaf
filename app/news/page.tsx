'use client'

import { useState } from 'react'

type NewsCategory = 'all' | 'match-results' | 'tournaments' | 'announcements' | 'communiques' | 'player-highlights'

export default function News() {
  const [activeCategory, setActiveCategory] = useState<NewsCategory>('all')

  const newsItems = [
    {
      id: 1,
      title: 'U16 Boys Win Regional Championship',
      category: 'match-results',
      date: 'November 15, 2024',
      excerpt: 'Our U16 boys team delivered an outstanding performance to win the regional championship with a 3-1 victory in the finals.',
      content: 'The team showed exceptional skill and teamwork throughout the tournament, culminating in a thrilling final match.',
    },
    {
      id: 2,
      title: 'New State-of-the-Art Training Facility Opens',
      category: 'announcements',
      date: 'November 10, 2024',
      excerpt: 'OMSA proudly announces the opening of our new advanced training facility with modern equipment and infrastructure.',
      content: 'The new facility features a full-sized pitch, gym, recovery center, and video analysis room for optimal player development.',
    },
    {
      id: 3,
      title: 'Registration Open for 2025 Season',
      category: 'announcements',
      date: 'November 5, 2024',
      excerpt: 'Registration for all categories and programs is now open for the 2025 season. Early registrations receive special rates.',
      content: 'Join OMSA for an exciting year of development, competition, and personal growth.',
    },
    {
      id: 4,
      title: 'U13 Girls Tournament Victory',
      category: 'tournaments',
      date: 'October 28, 2024',
      excerpt: 'Our U13 girls team wins the inter-academy tournament with impressive performances throughout the competition.',
      content: 'The girls demonstrated exceptional skill and sportsmanship, earning praise from tournament officials.',
    },
    {
      id: 5,
      title: 'Player Highlight: Rising Star Signed by Professional Club',
      category: 'player-highlights',
      date: 'October 20, 2024',
      excerpt: 'Former OMSA academy player earns professional contract with top-tier club after successful trials.',
      content: 'This achievement highlights the quality of development at OMSA and inspires current players to reach their potential.',
    },
    {
      id: 6,
      title: 'Important Update on Training Schedule',
      category: 'communiques',
      date: 'October 15, 2024',
      excerpt: 'Attention all students and parents: Please note the updated training schedule for the upcoming month.',
      content: 'See the notice board for detailed schedule changes and contact the office with any questions.',
    },
    {
      id: 7,
      title: 'Inter-Academy Challenge Cup Results',
      category: 'tournaments',
      date: 'October 10, 2024',
      excerpt: 'OMSA teams compete fiercely in the Inter-Academy Challenge Cup with multiple teams advancing to finals.',
      content: 'All teams demonstrated improved performance and competitive spirit throughout the tournament.',
    },
    {
      id: 8,
      title: 'Scholarship Opportunities Available',
      category: 'announcements',
      date: 'October 1, 2024',
      excerpt: 'OMSA announces scholarship opportunities for talented young athletes who demonstrate exceptional potential.',
      content: 'Applications are now being accepted for merit-based scholarships covering partial to full program costs.',
    },
  ]

  const filtered = activeCategory === 'all' 
    ? newsItems 
    : newsItems.filter(item => item.category === activeCategory)

  const categories: { value: NewsCategory; label: string }[] = [
    { value: 'all', label: 'All News' },
    { value: 'match-results', label: 'Match Results' },
    { value: 'tournaments', label: 'Tournaments' },
    { value: 'announcements', label: 'Announcements' },
    { value: 'communiques', label: 'Communiqués' },
    { value: 'player-highlights', label: 'Player Highlights' },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="hero-section py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">News & Results</h1>
          <p className="text-xl text-gray-100">
            Stay updated with latest news, results, and announcements from OMSA
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-muted border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-4 py-2 rounded transition ${
                  activeCategory === cat.value
                    ? 'bg-primary text-white'
                    : 'bg-white text-foreground hover:bg-border'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* News Feed */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="space-y-8">
          {filtered.map(item => (
            <article key={item.id} className="bg-white border border-border rounded-lg p-8 card-hover">
              <div className="flex items-start justify-between mb-4 flex-wrap gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold bg-primary text-white px-3 py-1 rounded capitalize">
                      {item.category.replace('-', ' ')}
                    </span>
                    <span className="text-sm text-muted-dark">{item.date}</span>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-3 text-primary hover:text-primary-light cursor-pointer transition">
                {item.title}
              </h2>

              <p className="text-muted-dark mb-4 leading-relaxed">
                {item.excerpt}
              </p>

              <p className="text-foreground leading-relaxed mb-4">
                {item.content}
              </p>

              <button className="text-primary font-semibold hover:text-primary-light transition">
                Read More →
              </button>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-dark text-lg">No news found in this category</p>
          </div>
        )}
      </div>
    </div>
  )
}
