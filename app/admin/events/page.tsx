'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getEvents, createEvent, updateEvent, deleteEvent } from '@/lib/content-service'
import { type Event } from '@/lib/types'

export default function EventsManagement() {
  const [events, setEvents] = useState<Event[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    category: 'U12',
    status: 'active' as const,
  })

  useEffect(() => {
    loadEvents()
  }, [])

  const loadEvents = () => {
    setEvents(getEvents())
  }

  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault()
    const eventData = {
      ...formData,
      date: new Date(formData.date),
      posterImage: '/community-event.png',
      createdBy: 'Admin',
    }

    if (editingId) {
      updateEvent(editingId, eventData as any)
      setEditingId(null)
    } else {
      createEvent(eventData as any)
    }

    loadEvents()
    setFormData({ title: '', description: '', date: '', location: '', category: 'U12', status: 'active' })
    setShowForm(false)
  }

  const handleEdit = (event: Event) => {
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date.toISOString().split('T')[0],
      location: event.location,
      category: event.category,
      status: event.status,
    })
    setEditingId(event.id)
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    if (confirm('Delete this event?')) {
      deleteEvent(id)
      loadEvents()
    }
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Events Management</h1>
          <p className="text-muted-dark mt-1">Create tournaments, matches, and announcements</p>
        </div>
        <Button
          onClick={() => {
            setEditingId(null)
            setFormData({ title: '', description: '', date: '', location: '', category: 'U12', status: 'active' })
            setShowForm(!showForm)
          }}
          className="bg-primary hover:bg-primary-light"
        >
          {showForm ? 'Cancel' : 'New Event'}
        </Button>
      </div>

      {showForm && (
        <Card className="p-6 mb-8">
          <form onSubmit={handleSaveEvent} className="space-y-4">
            <input
              type="text"
              placeholder="Event Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded"
              required
            />
            <textarea
              placeholder="Event Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded"
              required
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="px-4 py-2 border border-border rounded"
                required
              />
              <input
                type="text"
                placeholder="Location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="px-4 py-2 border border-border rounded"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="px-4 py-2 border border-border rounded"
              >
                <option value="U8">U8</option>
                <option value="U10">U10</option>
                <option value="U12">U12</option>
                <option value="U15">U15</option>
                <option value="U17">U17</option>
              </select>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="px-4 py-2 border border-border rounded"
              >
                <option value="active">Active</option>
                <option value="cancelled">Cancelled</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary-light">
              {editingId ? 'Update Event' : 'Create Event'}
            </Button>
          </form>
        </Card>
      )}

      <div className="space-y-4">
        {events.map((event) => (
          <Card key={event.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-bold text-lg text-foreground">{event.title}</h3>
                  <span className={`px-2 py-1 text-xs rounded font-semibold ${
                    event.status === 'active'
                      ? 'bg-green-100 text-green-700'
                      : event.status === 'cancelled'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                  </span>
                </div>
                <p className="text-sm text-muted-dark mb-2">{event.description}</p>
                <div className="flex flex-wrap gap-3 text-xs">
                  <span className="text-muted-dark">📅 {new Date(event.date).toLocaleDateString()}</span>
                  <span className="text-muted-dark">📍 {event.location}</span>
                  <span className="text-muted-dark">Category: {event.category}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(event)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(event.id)}
                  className="text-red-600"
                >
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {events.length === 0 && !showForm && (
        <Card className="p-12 text-center">
          <p className="text-muted-dark mb-4">No events created yet</p>
          <Button onClick={() => setShowForm(true)} className="bg-primary hover:bg-primary-light">
            Create Your First Event
          </Button>
        </Card>
      )}
    </div>
  )
}
