import { Mail, Phone, MapPin, Facebook } from 'lucide-react'
import Link from 'next/link'

export default function ContactQuickInfo() {
  return (
    <section className="py-16 md:py-24 bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Nous Contacter</h2>

        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="flex flex-col items-center text-center">
            <Mail className="w-12 h-12 mb-4 text-accent" />
            <h3 className="font-bold mb-2">Email</h3>
            <a href="mailto:olympicmonafsa280721@gmail.com" className="text-sm hover:text-accent transition">
              olympicmonafsa280721@gmail.com
            </a>
          </div>

          <div className="flex flex-col items-center text-center">
            <Phone className="w-12 h-12 mb-4 text-accent" />
            <h3 className="font-bold mb-2">WhatsApp</h3>
            <a href="tel:+237650937716" className="text-sm hover:text-accent transition">
              +237 650 93 77 16
            </a>
          </div>

          <div className="flex flex-col items-center text-center">
            <MapPin className="w-12 h-12 mb-4 text-accent" />
            <h3 className="font-bold mb-2">Localisation</h3>
            <p className="text-sm">Olembe, Yaoundé<br />Cameroun</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <Facebook className="w-12 h-12 mb-4 text-accent" />
            <h3 className="font-bold mb-2">Suivez-nous</h3>
            <a href="https://facebook.com" target="_blank" className="text-sm hover:text-accent transition">
              OMSA sur Facebook
            </a>
          </div>
        </div>

        <div className="text-center">
          <Link href="/contact" className="bg-white text-primary px-8 py-3 rounded font-bold hover:bg-gray-100 transition inline-block">
            Formulaire de contact
          </Link>
        </div>
      </div>
    </section>
  )
}