'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Programs', href: '/programs' },
    { label: 'Categories', href: '/categories' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'News', href: '/news' },
    { label: 'Staff', href: '/staff' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-primary text-white rounded px-3 py-1 font-bold text-sm md:text-base">
              OMSA
            </div>
            <span className="hidden sm:inline font-bold text-primary text-sm">
              Olympic Monaf
            </span>
          </Link>

          {/* Desktop Menu */}
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
            <Link
              href="/admin/login"
              className="ml-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary-light transition-colors text-sm font-medium"
            >
              Admin
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
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
            <Link
              href="/admin/login"
              className="block px-4 py-2 bg-primary text-white rounded hover:bg-primary-light transition-colors font-medium mt-2"
              onClick={() => setIsOpen(false)}
            >
              Admin Panel
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
