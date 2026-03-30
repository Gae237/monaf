export default function Programs() {
  return (
    <div className="min-h-screen">
      <div className="hero-section py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Nos Programmes</h1>
          <p className="text-xl text-gray-100">
            Développement complet alliant excellence footballistique et réussite académique
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 space-y-16">

        {/* Sport-Études */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-primary">Programme Sport-Études</h2>
            <div className="space-y-4 text-muted-dark">
              <p>
                Notre programme phare intègre un entraînement football d'élite avec un cursus académique rigoureux.
              </p>
              <div>
                <h3 className="font-bold mb-2">Emploi du temps académique</h3>
                <ul className="space-y-1 text-sm">
                  <li>• Cours le matin (8h - 12h)</li>
                  <li>• Entraînement l'après-midi (14h - 17h)</li>
                  <li>• Étude et soutien le soir (18h - 20h)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-2">Focus entraînement</h3>
                <ul className="space-y-1 text-sm">
                  <li>• Développement des compétences techniques</li>
                  <li>• Compréhension tactique</li>
                  <li>• Conditionnement physique</li>
                  <li>• Préparation mentale</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="h-96 rounded-lg overflow-hidden">
            <img
              src="/sport-etudes.jpg"
              alt="Sport-Études"
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* Internes */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div className="h-96 rounded-lg overflow-hidden">
            <img
              src="/boarding.jpg"
              alt="Programme Internat"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-primary">Internes (Programme d'Internat)</h2>
            <div className="space-y-4 text-muted-dark">
              <p>
                Notre programme résidentiel offre une supervision professionnelle 24h/24 avec des services de soutien complets.
              </p>
              <div>
                <h3 className="font-bold mb-2">Structure journalière</h3>
                <ul className="space-y-1 text-sm">
                  <li>• École (journée complète)</li>
                  <li>• Entraînement professionnel</li>
                  <li>• Repas et nutrition</li>
                  <li>• Récupération et repos</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-2">Services de soutien</h3>
                <ul className="space-y-1 text-sm">
                  <li>• Personnel médical sur place</li>
                  <li>• Soutien psychologique</li>
                  <li>• Conseils nutritionnels</li>
                  <li>• Encadrement disciplinaire</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Externes */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-primary">Externes (Programme Journalier)</h2>
            <div className="space-y-4 text-muted-dark">
              <p>
                Programme journalier flexible conçu pour les élèves qui préfèrent vivre chez eux tout en bénéficiant d'un entraînement football professionnel.
              </p>
              <div>
                <h3 className="font-bold mb-2">Horaires</h3>
                <ul className="space-y-1 text-sm">
                  <li>• Séances d'entraînement l'après-midi</li>
                  <li>• Entraînement football le soir</li>
                  <li>• Matchs et tournois le week-end</li>
                  <li>• Horaires flexibles pour l'école</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-2">Avantages</h3>
                <ul className="space-y-1 text-sm">
                  <li>• Scolarité à domicile</li>
                  <li>• Coaching professionnel</li>
                  <li>• Participation aux tournois</li>
                  <li>• Développement personnel</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="h-96 rounded-lg overflow-hidden">
            <img
              src="/day-program.jpg"
              alt="Programme Journalier"
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* Points forts */}
        <section className="bg-muted p-12 rounded-lg">
          <h2 className="text-3xl font-bold mb-8">Points forts des programmes</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg text-primary mb-3">Tournois du week-end</h3>
              <p className="text-sm text-muted-dark">
                Tournois compétitifs réguliers pour développer l'expérience en match et la conscience tactique.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-primary mb-3">Discipline & Éducation</h3>
              <p className="text-sm text-muted-dark">
                Accent fort sur le suivi scolaire, la discipline et le soutien éducatif pour tous les élèves.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-primary mb-3">Développement personnel</h3>
              <p className="text-sm text-muted-dark">
                Développement holistique axé sur la construction du caractère et les compétences de vie en parallèle du football.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}