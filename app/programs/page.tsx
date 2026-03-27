export default function Programs() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="hero-section py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Programs</h1>
          <p className="text-xl text-gray-100">
            Comprehensive development combining football excellence with academic achievement
          </p>
        </div>
      </div>

      {/* Programs */}
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 space-y-16">
        {/* Sport-Études */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-primary">Sport-Études Program</h2>
            <div className="space-y-4 text-muted-dark">
              <p>
                Our flagship program integrates elite football training with rigorous academic curriculum.
              </p>
              <div>
                <h3 className="font-bold mb-2">Academic Schedule</h3>
                <ul className="space-y-1 text-sm">
                  <li>• Morning classes (8 AM - 12 PM)</li>
                  <li>• Afternoon training (2 PM - 5 PM)</li>
                  <li>• Evening study & support (6 PM - 8 PM)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-2">Training Focus</h3>
                <ul className="space-y-1 text-sm">
                  <li>• Technical skill development</li>
                  <li>• Tactical understanding</li>
                  <li>• Physical conditioning</li>
                  <li>• Mental preparation</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="bg-gray-300 h-96 rounded-lg overflow-hidden">
            <img 
              src="/football-training.jpg"
              alt="Sport-Études"
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* Internal Program */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div className="bg-gray-300 h-96 rounded-lg overflow-hidden">
            <img 
              src="/boarding-academy-dormitory.jpg"
              alt="Boarding"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-primary">Internes (Boarding Program)</h2>
            <div className="space-y-4 text-muted-dark">
              <p>
                Our residential program provides 24/7 professional supervision with comprehensive support services.
              </p>
              <div>
                <h3 className="font-bold mb-2">Daily Structure</h3>
                <ul className="space-y-1 text-sm">
                  <li>• School (full day)</li>
                  <li>• Professional training</li>
                  <li>• Meals & nutrition</li>
                  <li>• Recovery & rest</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-2">Support Services</h3>
                <ul className="space-y-1 text-sm">
                  <li>• Medical staff on-site</li>
                  <li>• Psychological support</li>
                  <li>• Nutritional guidance</li>
                  <li>• Disciplinary oversight</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* External Program */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-primary">Externes (Day Program)</h2>
            <div className="space-y-4 text-muted-dark">
              <p>
                Flexible day program designed for students who prefer to live at home while receiving professional football training.
              </p>
              <div>
                <h3 className="font-bold mb-2">Schedule</h3>
                <ul className="space-y-1 text-sm">
                  <li>• Afternoon training sessions</li>
                  <li>• Evening football training</li>
                  <li>• Weekend matches & tournaments</li>
                  <li>• Flexible timing for school</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-2">Benefits</h3>
                <ul className="space-y-1 text-sm">
                  <li>• Home-based education</li>
                  <li>• Professional coaching</li>
                  <li>• Tournament participation</li>
                  <li>• Personal development</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="bg-gray-300 h-96 rounded-lg overflow-hidden">
            <img 
              src="/football-player-training.jpg"
              alt="Day Program"
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* Highlights */}
        <section className="bg-muted p-12 rounded-lg">
          <h2 className="text-3xl font-bold mb-8">Program Highlights</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg text-primary mb-3">Weekend Tournaments</h3>
              <p className="text-sm text-muted-dark">
                Regular competitive tournaments to develop match experience and tactical awareness.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-primary mb-3">Discipline & Education</h3>
              <p className="text-sm text-muted-dark">
                Strong emphasis on school monitoring, discipline, and educational support for all students.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-primary mb-3">Personal Development</h3>
              <p className="text-sm text-muted-dark">
                Holistic development focusing on character building and life skills alongside football.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
