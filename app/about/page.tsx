import Image from 'next/image'

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="hero-section py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About OMSA</h1>
          <p className="text-xl text-gray-100">
            Shaping the future of Cameroonian football since 2021
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 space-y-16">
        {/* Overview */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Academy Overview</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4 text-muted-dark">
              <p>
                Olympic Monaf Sport Academy (OMSA) was founded on July 28, 2021, with a vision to transform young Cameroonian talent into world-class footballers while maintaining academic excellence.
              </p>
              <p>
                Located in Olembe, Yaoundé, our academy combines professional football training with rigorous academic programs, creating well-rounded athletes and citizens.
              </p>
              <p>
                We offer flexible programs including Sport-Études (integrated sports and academics), Internes (boarding), and Externes (day program) for students aged 7-21.
              </p>
            </div>
            <div className="bg-gray-300 h-96 rounded-lg overflow-hidden">
              <img 
                src="/modern-football-academy-building.jpg"
                alt="Academy Building"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="grid md:grid-cols-2 gap-12">
          <div className="bg-primary text-white p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="leading-relaxed">
              To form young athletes through comprehensive football development and school education, creating disciplined, talented individuals who excel both on the field and in the classroom.
            </p>
          </div>
          <div className="bg-accent text-white p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
            <p className="leading-relaxed">
              To become the reference institution in football training in Cameroon and Africa, producing elite athletes who represent their country with pride and professionalism.
            </p>
          </div>
        </section>

        {/* Admission Requirements */}
        <section>
          <h2 className="text-3xl font-bold mb-8">Admission Requirements</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'Age Range', desc: 'Must be between 7 and 21 years old' },
              { title: 'Physical Fitness', desc: 'Must be physically fit and healthy' },
              { title: 'Motivation', desc: 'Must demonstrate genuine interest in football and academics' },
              { title: 'Commitment', desc: 'Voluntary participation with dedication to training' },
            ].map((req) => (
              <div key={req.title} className="bg-muted p-6 rounded-lg border border-border">
                <h3 className="font-bold text-lg mb-2 text-primary">{req.title}</h3>
                <p className="text-muted-dark">{req.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Key Facts */}
        <section className="bg-muted p-12 rounded-lg">
          <h2 className="text-3xl font-bold mb-8">Key Information</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">2021</div>
              <p className="text-muted-dark font-semibold">Founded: July 28, 2021</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">7-21</div>
              <p className="text-muted-dark font-semibold">Age Range Accepted</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">3</div>
              <p className="text-muted-dark font-semibold">Program Options</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
