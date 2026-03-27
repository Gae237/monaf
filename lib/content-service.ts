import {
  Gallery,
  GalleryImage,
  NewsArticle,
  Event,
  PlayerRegistration,
  StaffMember,
  AuditLog,
} from './types'

// In-memory storage (replace with database)
let galleries: Gallery[] = []
let newsArticles: NewsArticle[] = []
let events: Event[] = []
let playerRegistrations: PlayerRegistration[] = []
let staffMembers: StaffMember[] = []
let auditLogs: AuditLog[] = []

// Gallery Management
export function createGallery(data: Omit<Gallery, 'id' | 'createdAt' | 'updatedAt'>): Gallery {
  const gallery: Gallery = {
    ...data,
    id: `gallery-${Date.now()}`,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  galleries.push(gallery)
  return gallery
}

export function getGalleries(filters?: { season?: string; category?: string; isPublic?: boolean }): Gallery[] {
  let result = [...galleries]
  
  if (filters?.season) {
    result = result.filter(g => g.season === filters.season)
  }
  if (filters?.category) {
    result = result.filter(g => g.category === filters.category)
  }
  if (filters?.isPublic !== undefined) {
    result = result.filter(g => g.isPublic === filters.isPublic)
  }
  
  return result
}

export function updateGallery(id: string, data: Partial<Gallery>): Gallery | null {
  const index = galleries.findIndex(g => g.id === id)
  if (index === -1) return null
  
  galleries[index] = { ...galleries[index], ...data, updatedAt: new Date() }
  return galleries[index]
}

export function deleteGallery(id: string): boolean {
  const index = galleries.findIndex(g => g.id === id)
  if (index === -1) return false
  galleries.splice(index, 1)
  return true
}

// News Management
export function createNewsArticle(data: Omit<NewsArticle, 'id' | 'createdAt'>): NewsArticle {
  const article: NewsArticle = {
    ...data,
    id: `news-${Date.now()}`,
    createdAt: new Date(),
  }
  newsArticles.push(article)
  return article
}

export function getNewsArticles(filters?: { category?: string; isPublished?: boolean }): NewsArticle[] {
  let result = [...newsArticles]
  
  if (filters?.category) {
    result = result.filter(a => a.category === filters.category)
  }
  if (filters?.isPublished !== undefined) {
    result = result.filter(a => a.isPublished === filters.isPublished)
  }
  
  return result.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
}

export function updateNewsArticle(id: string, data: Partial<NewsArticle>): NewsArticle | null {
  const index = newsArticles.findIndex(a => a.id === id)
  if (index === -1) return null
  
  newsArticles[index] = { ...newsArticles[index], ...data, updatedAt: new Date() }
  return newsArticles[index]
}

export function deleteNewsArticle(id: string): boolean {
  const index = newsArticles.findIndex(a => a.id === id)
  if (index === -1) return false
  newsArticles.splice(index, 1)
  return true
}

// Event Management
export function createEvent(data: Omit<Event, 'id' | 'createdAt'>): Event {
  const event: Event = {
    ...data,
    id: `event-${Date.now()}`,
    createdAt: new Date(),
  }
  events.push(event)
  return event
}

export function getEvents(filters?: { category?: string; status?: string }): Event[] {
  let result = [...events]
  
  if (filters?.category) {
    result = result.filter(e => e.category === filters.category)
  }
  if (filters?.status) {
    result = result.filter(e => e.status === filters.status)
  }
  
  return result.sort((a, b) => a.date.getTime() - b.date.getTime())
}

export function updateEvent(id: string, data: Partial<Event>): Event | null {
  const index = events.findIndex(e => e.id === id)
  if (index === -1) return null
  
  events[index] = { ...events[index], ...data }
  return events[index]
}

export function deleteEvent(id: string): boolean {
  const index = events.findIndex(e => e.id === id)
  if (index === -1) return false
  events.splice(index, 1)
  return true
}

// Registration Management
export function createPlayerRegistration(data: Omit<PlayerRegistration, 'id' | 'registeredAt'>): PlayerRegistration {
  const registration: PlayerRegistration = {
    ...data,
    id: `reg-${Date.now()}`,
    registeredAt: new Date(),
  }
  playerRegistrations.push(registration)
  return registration
}

export function getPlayerRegistrations(filters?: { status?: string; category?: string }): PlayerRegistration[] {
  let result = [...playerRegistrations]
  
  if (filters?.status) {
    result = result.filter(r => r.status === filters.status)
  }
  if (filters?.category) {
    result = result.filter(r => r.category === filters.category)
  }
  
  return result.sort((a, b) => b.registeredAt.getTime() - a.registeredAt.getTime())
}

export function updatePlayerRegistration(id: string, data: Partial<PlayerRegistration>): PlayerRegistration | null {
  const index = playerRegistrations.findIndex(r => r.id === id)
  if (index === -1) return null
  
  playerRegistrations[index] = { ...playerRegistrations[index], ...data }
  return playerRegistrations[index]
}

// Staff Management
export function createStaffMember(data: Omit<StaffMember, 'id' | 'createdAt' | 'updatedAt'>): StaffMember {
  const staff: StaffMember = {
    ...data,
    id: `staff-${Date.now()}`,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  staffMembers.push(staff)
  return staff
}

export function getStaffMembers(): StaffMember[] {
  return [...staffMembers]
}

export function updateStaffMember(id: string, data: Partial<StaffMember>): StaffMember | null {
  const index = staffMembers.findIndex(s => s.id === id)
  if (index === -1) return null
  
  staffMembers[index] = { ...staffMembers[index], ...data, updatedAt: new Date() }
  return staffMembers[index]
}

export function deleteStaffMember(id: string): boolean {
  const index = staffMembers.findIndex(s => s.id === id)
  if (index === -1) return false
  staffMembers.splice(index, 1)
  return true
}

// Statistics
export function getStatistics() {
  return {
    totalNewsArticles: newsArticles.length,
    publishedArticles: newsArticles.filter(a => a.isPublished).length,
    totalEvents: events.length,
    activeEvents: events.filter(e => e.status === 'active').length,
    totalRegistrations: playerRegistrations.length,
    approvedRegistrations: playerRegistrations.filter(r => r.status === 'approved').length,
    pendingRegistrations: playerRegistrations.filter(r => r.status === 'pending').length,
    totalGalleries: galleries.length,
    totalStaff: staffMembers.length,
  }
}

// Audit logging
export function logAction(userId: string, action: string, resource: string, resourceId: string, changes: Record<string, any>): void {
  const log: AuditLog = {
    id: `audit-${Date.now()}`,
    userId,
    action,
    resource,
    resourceId,
    changes,
    timestamp: new Date(),
  }
  auditLogs.push(log)
  
  // Keep only last 1000 logs
  if (auditLogs.length > 1000) {
    auditLogs = auditLogs.slice(-1000)
  }
}

export function getAuditLogs(limit: number = 100): AuditLog[] {
  return auditLogs.slice(-limit).reverse()
}
