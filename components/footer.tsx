import Link from 'next/link'
import { Mail, Phone, Facebook } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-primary text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">OMSA</h3>
            <p className="text-sm text-gray-100">
              Former des talents, bâtir des champions – sur le terrain et à l'école.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-accent transition">About</Link></li>
              <li><Link href="/programs" className="hover:text-accent transition">Programs</Link></li>
              <li><Link href="/gallery" className="hover:text-accent transition">Gallery</Link></li>
              <li><Link href="/news" className="hover:text-accent transition">News</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-1 text-sm">
              <li>U8 - U18+ (Male)</li>
              <li>U13 - U18+ (Female)</li>
              <li>Sport-Études</li>
              <li>Boarding & Day Programs</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span>olympicmonafsa280721@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span>+237 650 93 77 16</span>
              </div>
              <a href="https://facebook.com" className="flex items-center gap-2 hover:text-accent">
                <Facebook size={16} />
                <span>OMSA on Facebook</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-400 pt-6 text-center text-sm text-gray-100">
          <p>&copy; 2025 Olympic Monaf Sport Academy. All rights reserved.</p>
          <p>Located in Olembe, Yaoundé, Cameroon | Founded July 28, 2021</p>
        </div>
      </div>
    </footer>
  )
}
