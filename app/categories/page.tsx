'use client'

import { useState } from 'react'
import RegistrationForm from '@/components/registration-form'

export default function Categories() {
  const [showForm, setShowForm] = useState(false)

  const maleCategories = [
    { age: 'U8', name: 'Débutants', description: 'Beginners Introduction' },
    { age: 'U10', name: 'Poussins', description: 'Fundamental Development' },
    { age: 'U12', name: 'Benjamins', description: 'Youth Foundation' },
    { age: 'U14', name: 'Minimes', description: 'Intermediate Level' },
    { age: 'U16', name: 'Cadets', description: 'Advanced Development' },
    { age: 'U18+', name: 'Juniors', description: 'Elite Training' },
  ]

  const femaleCategories = [
    { age: 'U13', name: 'Benjamines', description: 'Foundation Level' },
    { age: 'U15', name: 'Minimes', description: 'Intermediate Development' },
    { age: 'U17', name: 'Cadettes', description: 'Advanced Training' },
    { age: 'U18+', name: 'Juniors', description: 'Elite Level' },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="hero-section py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Categories & Registration</h1>
          <p className="text-xl text-gray-100">
            Find your category and join our academy
          </p>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Male Categories */}
          <div>
            <h2 className="text-3xl font-bold mb-8 text-primary">Male Categories</h2>
            <div className="space-y-4">
              {maleCategories.map((cat) => (
                <div key={cat.age} className="bg-white border-2 border-blue-200 p-6 rounded-lg card-hover">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-2xl font-bold text-primary">{cat.age}</div>
                      <div className="font-semibold">{cat.name}</div>
                      <div className="text-sm text-muted-dark">{cat.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Female Categories */}
          <div>
            <h2 className="text-3xl font-bold mb-8 text-primary">Female Categories</h2>
            <div className="space-y-4">
              {femaleCategories.map((cat) => (
                <div key={cat.age} className="bg-white border-2 border-orange-200 p-6 rounded-lg card-hover">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-2xl font-bold text-orange-500">{cat.age}</div>
                      <div className="font-semibold">{cat.name}</div>
                      <div className="text-sm text-muted-dark">{cat.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Registration Section */}
        <div className="border-t pt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Register Now</h2>
            <p className="text-muted-dark max-w-2xl mx-auto">
              Complete the registration form to join Olympic Monaf Sport Academy. We'll review your information and contact you soon.
            </p>
          </div>

          {!showForm ? (
            <div className="text-center">
              <button
                onClick={() => setShowForm(true)}
                className="btn-primary"
              >
                Open Registration Form
              </button>
            </div>
          ) : (
            <div className="bg-muted p-8 rounded-lg">
              <RegistrationForm onClose={() => setShowForm(false)} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
