export default function Staff() {
  const staffMembers = [
    { title: 'President', name: '', description: 'Coming Soon' },
    { title: 'Director General', name: '', description: 'Coming Soon' },
    { title: 'Head Coach', name: '', description: 'Coming Soon' },
    { title: 'Assistant Coach', name: '', description: 'Coming Soon' },
    { title: 'Goalkeeper Coach', name: '', description: 'Coming Soon' },
    { title: 'Team Doctor', name: '', description: 'Coming Soon' },
    { title: 'Physiotherapist', name: '', description: 'Coming Soon' },
    { title: 'Administrative Director', name: '', description: 'Coming Soon' },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="hero-section py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Staff & Management</h1>
          <p className="text-xl text-gray-100">
            Meet the experienced team behind OMSA
          </p>
        </div>
      </div>

      {/* Staff Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {staffMembers.map((member, idx) => (
            <div key={idx} className="bg-white rounded-lg overflow-hidden border border-border card-hover">
              <div className="bg-gray-300 h-64 flex items-center justify-center">
                <img 
                  src={`/placeholder.svg?height=400&width=400&query=professional staff member`}
                  alt={member.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-primary mb-1">{member.title}</h3>
                <p className="font-semibold mb-3 text-foreground">{member.name || 'To Be Announced'}</p>
                <p className="text-sm text-muted-dark">{member.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 bg-muted rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Team Structure</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-bold text-primary mb-2">Technical Staff</h3>
              <p className="text-sm text-muted-dark">Head coaches, assistant coaches, and specialized trainers dedicated to player development</p>
            </div>
            <div>
              <h3 className="font-bold text-primary mb-2">Medical Staff</h3>
              <p className="text-sm text-muted-dark">Doctors, physiotherapists, and medical professionals ensuring player health and safety</p>
            </div>
            <div>
              <h3 className="font-bold text-primary mb-2">Administrative Staff</h3>
              <p className="text-sm text-muted-dark">Management and support staff handling academy operations and student coordination</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
