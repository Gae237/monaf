import Link from 'next/link'

export default function Hero() {
  return (
    <section className="hero-section relative overflow-hidden pt-20 pb-32 md:pt-32 md:pb-48">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-10 w-72 h-72 bg-accent rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-balance">
            Olympic Monaf Sport Academy
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100 text-balance">
            Former des talents, bâtir des champions – sur le terrain et à l'école.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/about" className="btn-primary">
              Discover the Academy
            </Link>
            <Link href="/categories" className="btn-secondary">
              Register Now
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {[
            { title: 'Sport-Études', desc: 'Academic excellence combined with elite football training' },
            { title: 'Internes', desc: 'Full boarding program with 24/7 professional supervision' },
            { title: 'Externes', desc: 'Day program with flexible schedule for active students' },
          ].map((item) => (
            <div key={item.title} className="bg-white/10 backdrop-blur rounded-lg p-6 text-white border border-white/20 card-hover">
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-gray-100">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
