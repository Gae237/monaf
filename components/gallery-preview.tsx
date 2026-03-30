'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function GalleryPreview() {
  const [galleries, setGalleries] = useState<any[]>([])

  useEffect(() => {
    supabase
      .from('galleries')
      .select('*')
      .eq('is_public', true)
      .order('created_at', { ascending: false })
      .limit(4)
      .then(({ data }) => setGalleries(data || []))
  }, [])

  if (galleries.length === 0) return null

  return (
    <section className="py-16 md:py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Galerie</h2>
          <p className="text-muted-dark">Moments de nos entraînements et tournois</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {galleries.map((gallery) => (
            <div key={gallery.id} className="relative h-64 rounded-lg overflow-hidden card-hover bg-gray-300">
              {gallery.media_urls?.[0] ? (
                <img
                  src={gallery.media_urls[0]}
                  alt={gallery.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <span className="text-5xl">📸</span>
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 flex items-end p-4">
                <h3 className="text-white font-bold text-lg">{gallery.title}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/gallery" className="btn-primary inline-block">
            Voir toute la galerie
          </Link>
        </div>
      </div>
    </section>
  )
}