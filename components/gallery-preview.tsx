import Link from 'next/link'

export default function GalleryPreview() {
  const images = [
    { id: 1, title: 'Séance d\'entraînement' },
    { id: 2, title: 'Jour de match' },
    { id: 3, title: 'Célébration de l\'équipe' },
    { id: 4, title: 'Installations de l\'académie' },
  ]

  return (
    <section className="py-16 md:py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Galerie</h2>
          <p className="text-muted-dark">Moments de nos entraînements et tournois</p>
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
            Voir toute la galerie
          </Link>
        </div>
      </div>
    </section>
  )
}