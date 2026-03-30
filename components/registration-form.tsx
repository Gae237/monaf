'use client'

import { useState } from 'react'
import { Upload } from 'lucide-react'
import { createPlayerRegistration } from '@/lib/content-service'
import { supabase } from '@/lib/supabase'

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
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

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

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setLoading(true)
  setError('')

  try {
    let photoUrl = ''

    // Upload photo si elle existe
    if (formData.photoFile) {
      const fileExt = formData.photoFile.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('registrations')
        .upload(fileName, formData.photoFile)

      if (uploadError) throw new Error(uploadError.message)

      const { data: urlData } = supabase.storage
        .from('registrations')
        .getPublicUrl(fileName)

      photoUrl = urlData.publicUrl
    }

    await createPlayerRegistration({
  firstName: formData.childName.split(' ')[0] || formData.childName,
  lastName: formData.childName.split(' ').slice(1).join(' ') || '',
  email: formData.email,
  phone: formData.phoneNumber,
  dateOfBirth: formData.dateOfBirth,
  category: formData.category,
  programType: formData.programType,
  status: 'pending',
  notes: `Tuteur/Parent : ${formData.guardianName}`,
  photoUrl: photoUrl,
})

    setSubmitted(true)
    setTimeout(() => onClose(), 3000)
  } catch (err) {
    setError("Une erreur s'est produite. Veuillez réessayer.")
    console.error(err)
  } finally {
    setLoading(false)
  }
}

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">✓</div>
        <h3 className="text-2xl font-bold text-green-600 mb-2">Inscription réussie !</h3>
        <p className="text-muted-dark">
          Merci pour votre inscription. Nous vous contacterons bientôt au numéro de téléphone ou à l'adresse e-mail fournis.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block font-semibold mb-2">Nom du tuteur/parent *</label>
          <input type="text" name="guardianName" value={formData.guardianName}
            onChange={handleChange} required
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Nom complet" />
        </div>
        <div>
          <label className="block font-semibold mb-2">Nom de l'enfant/joueur *</label>
          <input type="text" name="childName" value={formData.childName}
            onChange={handleChange} required
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Nom complet" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block font-semibold mb-2">Date de naissance *</label>
          <input type="date" name="dateOfBirth" value={formData.dateOfBirth}
            onChange={handleChange} required
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <div>
          <label className="block font-semibold mb-2">Âge (calculé automatiquement)</label>
          <input type="text" value={formData.age} readOnly
            className="w-full px-4 py-2 border border-border rounded-lg bg-muted"
            placeholder="Âge" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block font-semibold mb-2">Catégorie *</label>
          <select name="category" value={formData.category} onChange={handleChange} required
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
            <option value="">Choisir une catégorie</option>
            <optgroup label="Masculin">
              <option value="U8">U8 - Débutants</option>
              <option value="U10">U10 - Poussins</option>
              <option value="U12">U12 - Benjamins</option>
              <option value="U14">U14 - Minimes</option>
              <option value="U16">U16 - Cadets</option>
              <option value="U18+">U18+ - Juniors</option>
            </optgroup>
            <optgroup label="Féminin">
              <option value="U13">U13 - Benjamines</option>
              <option value="U15">U15 - Minimes</option>
              <option value="U17">U17 - Cadettes</option>
              <option value="U18+F">U18+ - Juniors</option>
            </optgroup>
          </select>
        </div>
        <div>
          <label className="block font-semibold mb-2">Type de programme *</label>
          <select name="programType" value={formData.programType} onChange={handleChange} required
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
            <option value="">Choisir un programme</option>
            <option value="sport-etudes">Sport-Études</option>
            <option value="internes">Internes</option>
            <option value="externes">Externes</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block font-semibold mb-2">Numéro de téléphone (WhatsApp) *</label>
          <input type="tel" name="phoneNumber" value={formData.phoneNumber}
            onChange={handleChange} required
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="+237 6XX XX XX XX" />
        </div>
        <div>
          <label className="block font-semibold mb-2">Email *</label>
          <input type="email" name="email" value={formData.email}
            onChange={handleChange} required
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="email@exemple.com" />
        </div>
      </div>

      <div>
        <label className="block font-semibold mb-2">Photo de l'enfant</label>
        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:bg-muted transition">
          <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="photo" />
          <label htmlFor="photo" className="cursor-pointer flex flex-col items-center gap-2">
            <Upload size={24} className="text-muted-dark" />
            {formData.photoFile ? (
              <div className="font-semibold text-green-600 text-sm">✓ {formData.photoFile.name}</div>
            ) : (
              <div className="text-sm">
                <div className="font-semibold">Cliquer pour télécharger une photo</div>
                <div className="text-muted-dark">ou glisser-déposer</div>
              </div>
            )}
          </label>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <div className="flex gap-4">
        <button type="submit" disabled={loading}
          className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed">
          {loading ? 'Envoi en cours...' : "Soumettre l'inscription"}
        </button>
        <button type="button" onClick={onClose} className="btn-secondary flex-1">
          Annuler
        </button>
      </div>
    </form>
  )
}