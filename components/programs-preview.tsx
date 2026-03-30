import Link from 'next/link'

export default function ProgramsPreview() {
  return (
    <section className="py-16 md:py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos Programmes</h2>
          <p className="text-muted-dark max-w-2xl mx-auto">
            Développement complet du football avec réussite académique et croissance personnelle
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {[
            {
              title: 'Emploi du temps académique',
              items: ['Cours le matin', "Entraînement l'après-midi", 'Étude le soir', 'Matchs le week-end']
            },
            {
              title: "Focus entraînement",
              items: ['Compétences techniques', 'Conscience tactique', 'Conditionnement physique', 'Développement mental']
            },
            {
              title: 'Services de soutien',
              items: ['Conseils nutritionnels', 'Soins médicaux', 'Soutien psychologique', 'Tutorat académique']
            }
          ].map((item) => (
            <div key={item.title} className="bg-white p-8 rounded-lg border border-border card-hover">
              <h3 className="font-bold text-lg mb-4 text-primary">{item.title}</h3>
              <ul className="space-y-2">
                {item.items.map((i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/programs" className="btn-primary inline-block">
            Voir tous les programmes
          </Link>
        </div>
      </div>
    </section>
  )
}