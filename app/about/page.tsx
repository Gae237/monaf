export default function About() {
  return (
    <div className="min-h-screen">
      <div className="hero-section py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">À propos de l'OMSA</h1>
          <p className="text-xl text-gray-100">
            Façonner l'avenir du football camerounais depuis 2021
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 space-y-16">
        {/* Présentation */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Présentation de l'Académie</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4 text-muted-dark">
              <p>
                L'Olympic Monaf Sport Academy (OMSA) a été fondée le 28 juillet 2021 avec la vision de transformer les jeunes talents camerounais en footballeurs de classe mondiale, tout en maintenant l'excellence académique.
              </p>
              <p>
                Située à Olembe, Yaoundé, notre académie combine un entraînement professionnel de football avec des programmes académiques rigoureux, formant des athlètes complets et des citoyens responsables.
              </p>
              <p>
                Nous proposons des programmes flexibles incluant le Sport-Études (sports et académique intégrés), les Internes (internat) et les Externes (programme journalier) pour les étudiants âgés de 7 à 21 ans.
              </p>
            </div>
            <div className="h-96 rounded-lg overflow-hidden">
              <img
                src="/academy.jpg"
                alt="Académie OMSA"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="grid md:grid-cols-2 gap-12">
          <div className="bg-primary text-white p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Notre Mission</h3>
            <p className="leading-relaxed">
              Former de jeunes athlètes grâce à un développement complet du football et une éducation scolaire, créant des individus disciplinés et talentueux qui excellent sur le terrain comme en classe.
            </p>
          </div>
          <div className="bg-accent text-white p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Notre Vision</h3>
            <p className="leading-relaxed">
              Devenir l'institution de référence en matière de formation footballistique au Cameroun et en Afrique, produisant des athlètes d'élite qui représentent leur pays avec fierté et professionnalisme.
            </p>
          </div>
        </section>

        {/* Conditions d'admission */}
        <section>
          <h2 className="text-3xl font-bold mb-8">Conditions d'admission</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'Tranche d\'âge', desc: 'Doit avoir entre 7 et 21 ans' },
              { title: 'Condition physique', desc: 'Doit être en bonne santé et physiquement apte' },
              { title: 'Motivation', desc: 'Doit démontrer un intérêt sincère pour le football et les études' },
              { title: 'Engagement', desc: 'Participation volontaire avec une dédicace à l\'entraînement' },
            ].map((req) => (
              <div key={req.title} className="bg-muted p-6 rounded-lg border border-border">
                <h3 className="font-bold text-lg mb-2 text-primary">{req.title}</h3>
                <p className="text-muted-dark">{req.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Chiffres clés */}
        <section className="bg-muted p-12 rounded-lg">
          <h2 className="text-3xl font-bold mb-8">Informations clés</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">2021</div>
              <p className="text-muted-dark font-semibold">Fondée le 28 juillet 2021</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">7-21</div>
              <p className="text-muted-dark font-semibold">Tranche d'âge acceptée</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">3</div>
              <p className="text-muted-dark font-semibold">Options de programmes</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}