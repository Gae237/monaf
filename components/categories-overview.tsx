export default function CategoriesOverview() {
  const maleCategories = [
    { name: 'U8', frName: 'Débutants', color: 'bg-blue-100' },
    { name: 'U10', frName: 'Poussins', color: 'bg-blue-200' },
    { name: 'U12', frName: 'Benjamins', color: 'bg-blue-300' },
    { name: 'U14', frName: 'Minimes', color: 'bg-blue-400' },
    { name: 'U16', frName: 'Cadets', color: 'bg-blue-500' },
    { name: 'U18+', frName: 'Juniors', color: 'bg-primary' },
  ]

  const femaleCategories = [
    { name: 'U13', frName: 'Benjamines', color: 'bg-accent' },
    { name: 'U15', frName: 'Minimes', color: 'bg-orange-400' },
    { name: 'U17', frName: 'Cadettes', color: 'bg-orange-500' },
    { name: 'U18+', frName: 'Juniors', color: 'bg-orange-600' },
  ]

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Categories & Training Levels</h2>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-primary">Male Categories</h3>
            <div className="grid grid-cols-2 gap-4">
              {maleCategories.map((cat) => (
                <div key={cat.name} className={`${cat.color} p-6 rounded-lg text-center card-hover transform`}>
                  <div className="text-3xl font-bold text-primary mb-1">{cat.name}</div>
                  <div className="text-sm text-foreground font-medium">{cat.frName}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6 text-primary">Female Categories</h3>
            <div className="grid grid-cols-2 gap-4">
              {femaleCategories.map((cat) => (
                <div key={cat.name} className={`${cat.color} p-6 rounded-lg text-center card-hover transform`}>
                  <div className="text-3xl font-bold text-white mb-1">{cat.name}</div>
                  <div className="text-sm text-white font-medium">{cat.frName}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
