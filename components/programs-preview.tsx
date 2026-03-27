import Link from 'next/link'

export default function ProgramsPreview() {
  return (
    <section className="py-16 md:py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Programs</h2>
          <p className="text-muted-dark max-w-2xl mx-auto">
            Comprehensive football development with academic achievement and personal growth
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {[
            {
              title: 'Academic Schedule',
              items: ['Morning classes', 'Afternoon training', 'Evening study', 'Weekend matches']
            },
            {
              title: 'Training Focus',
              items: ['Technical skills', 'Tactical awareness', 'Physical conditioning', 'Mental development']
            },
            {
              title: 'Support Services',
              items: ['Nutritional guidance', 'Medical care', 'Psychological support', 'Academic tutoring']
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
            View Full Programs
          </Link>
        </div>
      </div>
    </section>
  )
}
