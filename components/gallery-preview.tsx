import Link from 'next/link'
import Image from 'next/image'

export default function GalleryPreview() {
  const images = [
    { id: 1, title: 'Training Session', query: 'youth football training' },
    { id: 2, title: 'Match Day', query: 'football match action' },
    { id: 3, title: 'Team Celebration', query: 'football team celebration' },
    { id: 4, title: 'Academy Facility', query: 'modern football academy' },
  ]

  return (
    <section className="py-16 md:py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Gallery Highlights</h2>
          <p className="text-muted-dark">Moments from our training and tournaments</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {images.map((img) => (
            <div key={img.id} className="relative h-64 rounded-lg overflow-hidden card-hover bg-gray-300">
              <img 
                src={`/.jpg?height=400&width=600&query=${img.title}`}
                alt={img.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-end p-4">
                <h3 className="text-white font-bold text-lg">{img.title}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/gallery" className="btn-primary inline-block">
            View Full Gallery
          </Link>
        </div>
      </div>
    </section>
  )
}
