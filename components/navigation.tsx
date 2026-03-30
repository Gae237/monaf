'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: 'Accueil', href: '/' },
    { label: 'À propos', href: '/about' },
    { label: 'Programmes', href: '/programs' },
    { label: 'Catégories', href: '/categories' },
    { label: 'Galerie', href: '/gallery' },
    { label: 'Actualités', href: '/news' },
    { label: 'Staff', href: '/staff' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
         <Link href="/" className="flex items-center gap-2">
  <Image
    src="/logo.jpg"
    alt="OMSA Logo"
    width={45}
    height={45}
    className="rounded-full object-cover"
  />
  <div className="bg-primary text-white rounded px-3 py-1 font-bold text-sm md:text-base">
    OMSA
  </div>
  <span className="hidden sm:inline font-bold text-primary text-sm">
    Olympic Monaf
  </span>
</Link>

          <div className="hidden md:flex gap-8 items-center">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-foreground hover:text-primary-light transition-colors text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden"
            aria-label="Ouvrir le menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-2 text-foreground hover:bg-muted rounded"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}