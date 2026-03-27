'use client'

import { useState } from 'react'
import { Upload, X } from 'lucide-react'

interface RegistrationFormProps {
  onClose: () => void
}

export default function RegistrationForm({ onClose }: RegistrationFormProps) {
  const [formData, setFormData] = useState({
    guardianName: '',
    childName: '',
    dateOfBirth: '',
    age: '',
    category: '',
    programType: '',
    phoneNumber: '',
    email: '',
    photoFile: null as File | null,
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    // Auto-calculate age
    if (name === 'dateOfBirth' && value) {
      const birthDate = new Date(value)
      const today = new Date()
      let age = today.getFullYear() - birthDate.getFullYear()
      const monthDiff = today.getMonth() - birthDate.getMonth()
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }
      setFormData(prev => ({ ...prev, age: age.toString() }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFormData(prev => ({ ...prev, photoFile: e.target.files![0] }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => {
      onClose()
    }, 2000)
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">✓</div>
        <h3 className="text-2xl font-bold text-green-600 mb-2">Registration Successful!</h3>
        <p className="text-muted-dark">
          Thank you for registering. We will contact you soon at the provided phone number or email.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block font-semibold mb-2">Guardian/Parent Name *</label>
          <input
            type="text"
            name="guardianName"
            value={formData.guardianName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Full name"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Child/Player Name *</label>
          <input
            type="text"
            name="childName"
            value={formData.childName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Full name"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block font-semibold mb-2">Date of Birth *</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Age (Auto-calculated)</label>
          <input
            type="text"
            value={formData.age}
            readOnly
            className="w-full px-4 py-2 border border-border rounded-lg bg-muted"
            placeholder="Age"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block font-semibold mb-2">Category *</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select Category</option>
            <optgroup label="Male">
              <option value="U8">U8 - Débutants</option>
              <option value="U10">U10 - Poussins</option>
              <option value="U12">U12 - Benjamins</option>
              <option value="U14">U14 - Minimes</option>
              <option value="U16">U16 - Cadets</option>
              <option value="U18+">U18+ - Juniors</option>
            </optgroup>
            <optgroup label="Female">
              <option value="U13">U13 - Benjamines</option>
              <option value="U15">U15 - Minimes</option>
              <option value="U17">U17 - Cadettes</option>
              <option value="U18+F">U18+ - Juniors</option>
            </optgroup>
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-2">Program Type *</label>
          <select
            name="programType"
            value={formData.programType}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select Program</option>
            <option value="sport-etudes">Sport-Études</option>
            <option value="internes">Internes (Boarding)</option>
            <option value="externes">Externes (Day Program)</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block font-semibold mb-2">Phone Number (WhatsApp) *</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="+237 6XX XX XX XX"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="email@example.com"
          />
        </div>
      </div>

      <div>
        <label className="block font-semibold mb-2">Upload Child Photo</label>
        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:bg-muted transition">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="photo"
          />
          <label htmlFor="photo" className="cursor-pointer flex flex-col items-center gap-2">
            <Upload size={24} className="text-muted-dark" />
            {formData.photoFile ? (
              <div className="text-sm">
                <div className="font-semibold text-green-600">✓ {formData.photoFile.name}</div>
              </div>
            ) : (
              <div className="text-sm">
                <div className="font-semibold">Click to upload photo</div>
                <div className="text-muted-dark">or drag and drop</div>
              </div>
            )}
          </label>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          className="btn-primary flex-1"
        >
          Submit Registration
        </button>
        <button
          type="button"
          onClick={onClose}
          className="btn-secondary flex-1"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
