import Link from 'next/link'

export default function NewsPreview() {
  const news = [
    {
      title: 'U16 Team Wins Regional Championship',
      category: 'Match Results',
      date: 'November 15, 2024',
      excerpt: 'Congratulations to our U16 boys team on their impressive victory at the regional tournament.',
    },
    {
      title: 'New Training Facility Opens',
      category: 'Announcements',
      date: 'November 10, 2024',
      excerpt: 'We are excited to announce the opening of our state-of-the-art training facility.',
    },
    {
      title: 'Registration for 2025 Season Now Open',
      category: 'Announcements',
      date: 'November 5, 2024',
      excerpt: 'Registration for all categories in the 2025 season is now accepting applications.',
    },
  ]

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest News & Results</h2>
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
            View All News
          </Link>
        </div>
      </div>
    </section>
  )
}
