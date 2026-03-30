import Link from 'next/link'

export default function NewsPreview() {
  const news = [
    {
      title: "L'équipe U16 remporte le championnat régional",
      category: 'Résultats',
      date: '15 novembre 2024',
      excerpt: "Félicitations à notre équipe U16 pour leur victoire impressionnante au tournoi régional.",
    },
    {
      title: 'Ouverture des nouvelles installations',
      category: 'Annonces',
      date: '10 novembre 2024',
      excerpt: "Nous sommes ravis d'annoncer l'ouverture de notre complexe d'entraînement moderne.",
    },
    {
      title: 'Inscriptions saison 2025 ouvertes',
      category: 'Annonces',
      date: '5 novembre 2024',
      excerpt: "Les inscriptions pour toutes les catégories de la saison 2025 sont maintenant ouvertes.",
    },
  ]

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Actualités & Résultats</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {news.map((item, idx) => (
            <div key={idx} className="bg-white border border-border rounded-lg p-6 card-hover">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold bg-primary text-white px-2 py-1 rounded">
                  {item.category}
                </span>
                <span className="text-xs text-muted-dark">{item.date}</span>
              </div>
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-muted-dark">{item.excerpt}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/news" className="btn-primary inline-block">
            Voir toutes les actualités
          </Link>
        </div>
      </div>
    </section>
  )
}