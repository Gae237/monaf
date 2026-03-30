'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Staff() {
  const [staff, setStaff] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('staff_members')
      .select('*')
      .order('created_at', { ascending: true })
      .then(({ data }) => {
        setStaff(data || [])
        setLoading(false)
      })
  }, [])

  return (
    <div className="min-h-screen">
      <div className="hero-section py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Staff & Direction</h1>
          <p className="text-xl text-gray-100">Rencontrez l'équipe expérimentée derrière l'OMSA</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-dark">Chargement...</p>
          </div>
        ) : staff.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-dark text-lg">Les membres du staff seront bientôt annoncés.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {staff.map((member) => (
              <div key={member.id}
                className="bg-white rounded-lg overflow-hidden border border-border card-hover">
                <div className="h-64 bg-muted overflow-hidden flex items-center justify-center">
                  {member.photo_url ? (
                    <img src={member.photo_url} alt={member.name}
                      className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-7xl">👤</span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-primary mb-1">{member.position}</h3>
                  <p className="font-semibold mb-2 text-foreground">{member.name}</p>
                  <div className="space-y-1 text-sm text-muted-dark">
                    <p>📧 {member.email}</p>
                    <p>📞 {member.phone}</p>
                    <p>Rôle : {member.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-16 p-8 bg-muted rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Structure de l'équipe</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-bold text-primary mb-2">Staff Technique</h3>
              <p className="text-sm text-muted-dark">Entraîneurs principaux, assistants et formateurs spécialisés dédiés au développement des joueurs</p>
            </div>
            <div>
              <h3 className="font-bold text-primary mb-2">Staff Médical</h3>
              <p className="text-sm text-muted-dark">Médecins, kinésithérapeutes et professionnels de santé assurant la santé et la sécurité des joueurs</p>
            </div>
            <div>
              <h3 className="font-bold text-primary mb-2">Staff Administratif</h3>
              <p className="text-sm text-muted-dark">Direction et personnel de soutien gérant les opérations de l'académie et la coordination des élèves</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}