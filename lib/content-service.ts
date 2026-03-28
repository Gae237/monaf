import { supabase } from './supabase'
import {
  Gallery, GalleryImage, NewsArticle,
  Event, PlayerRegistration, StaffMember, AuditLog,
} from './types'

// ─── GALLERY ────────────────────────────────────────────
export async function createGallery(data: Omit<Gallery, 'id' | 'createdAt' | 'updatedAt'>) {
  const { data: result, error } = await supabase
    .from('galleries')
    .insert({ ...data, is_public: data.isPublic })
    .select().single()
  if (error) throw new Error(error.message)
  return result
}

export async function getGalleries(filters?: { season?: string; category?: string; isPublic?: boolean }) {
  let query = supabase.from('galleries').select('*, gallery_images(*)')
  if (filters?.season) query = query.eq('season', filters.season)
  if (filters?.category) query = query.eq('category', filters.category)
  if (filters?.isPublic !== undefined) query = query.eq('is_public', filters.isPublic)
  const { data, error } = await query
  if (error) throw new Error(error.message)
  return data || []
}

export async function updateGallery(id: string, data: Partial<Gallery>) {
  const { data: result, error } = await supabase
    .from('galleries').update(data).eq('id', id).select().single()
  if (error) throw new Error(error.message)
  return result
}

export async function deleteGallery(id: string) {
  const { error } = await supabase.from('galleries').delete().eq('id', id)
  if (error) throw new Error(error.message)
  return true
}

// ─── NEWS ────────────────────────────────────────────────
export async function createNewsArticle(data: Omit<NewsArticle, 'id' | 'updatedAt'>) {
  const { data: result, error } = await supabase
    .from('news_articles')
    .insert({
      title: data.title,
      content: data.content,
      excerpt: data.excerpt,
      featured_image: data.featuredImage,
      category: data.category,
      author: data.author,
      is_published: data.isPublished,
      published_at: data.publishedAt,
      scheduled_for: data.scheduledFor,
    })
    .select().single()
  if (error) throw new Error(error.message)
  return result
}

export async function getNewsArticles(filters?: { category?: string; isPublished?: boolean }) {
  let query = supabase.from('news_articles').select('*').order('published_at', { ascending: false })
  if (filters?.category) query = query.eq('category', filters.category)
  if (filters?.isPublished !== undefined) query = query.eq('is_published', filters.isPublished)
  const { data, error } = await query
  if (error) throw new Error(error.message)
  return data || []
}

export async function updateNewsArticle(id: string, data: Partial<NewsArticle>) {
  const { data: result, error } = await supabase
    .from('news_articles').update(data).eq('id', id).select().single()
  if (error) throw new Error(error.message)
  return result
}

export async function deleteNewsArticle(id: string) {
  const { error } = await supabase.from('news_articles').delete().eq('id', id)
  if (error) throw new Error(error.message)
  return true
}

// ─── EVENTS ──────────────────────────────────────────────
export async function createEvent(data: Omit<Event, 'id' | 'createdAt'>) {
  const { data: result, error } = await supabase
    .from('events')
    .insert({
      title: data.title,
      description: data.description,
      date: data.date,
      location: data.location,
      poster_image: data.posterImage,
      category: data.category,
      status: data.status,
      created_by: data.createdBy,
    })
    .select().single()
  if (error) throw new Error(error.message)
  return result
}

export async function getEvents(filters?: { category?: string; status?: string }) {
  let query = supabase.from('events').select('*').order('date', { ascending: true })
  if (filters?.category) query = query.eq('category', filters.category)
  if (filters?.status) query = query.eq('status', filters.status)
  const { data, error } = await query
  if (error) throw new Error(error.message)
  return data || []
}

export async function updateEvent(id: string, data: Partial<Event>) {
  const { data: result, error } = await supabase
    .from('events').update(data).eq('id', id).select().single()
  if (error) throw new Error(error.message)
  return result
}

export async function deleteEvent(id: string) {
  const { error } = await supabase.from('events').delete().eq('id', id)
  if (error) throw new Error(error.message)
  return true
}

// ─── REGISTRATIONS ───────────────────────────────────────
export async function createPlayerRegistration(data: Omit<PlayerRegistration, 'id' | 'registeredAt'>) {
  const { data: result, error } = await supabase
    .from('player_registrations')
    .insert({
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone: data.phone,
      date_of_birth: data.dateOfBirth,
      category: data.category,
      program_type: data.programType,
      status: data.status,
      notes: data.notes,
    })
    .select().single()
  if (error) throw new Error(error.message)
  return result
}

export async function getPlayerRegistrations(filters?: { status?: string; category?: string }) {
  let query = supabase.from('player_registrations').select('*').order('registered_at', { ascending: false })
  if (filters?.status) query = query.eq('status', filters.status)
  if (filters?.category) query = query.eq('category', filters.category)
  const { data, error } = await query
  if (error) throw new Error(error.message)
  return data || []
}

export async function updatePlayerRegistration(id: string, data: Partial<PlayerRegistration>) {
  const { data: result, error } = await supabase
    .from('player_registrations').update(data).eq('id', id).select().single()
  if (error) throw new Error(error.message)
  return result
}

// ─── STAFF ───────────────────────────────────────────────
export async function createStaffMember(data: Omit<StaffMember, 'id' | 'createdAt' | 'updatedAt'>) {
  const { data: result, error } = await supabase
    .from('staff_members')
    .insert({
      name: data.name,
      position: data.position,
      email: data.email,
      phone: data.phone,
      profile_image: data.profileImage,
      role: data.role,
    })
    .select().single()
  if (error) throw new Error(error.message)
  return result
}

export async function getStaffMembers() {
  const { data, error } = await supabase.from('staff_members').select('*')
  if (error) throw new Error(error.message)
  return data || []
}

export async function updateStaffMember(id: string, data: Partial<StaffMember>) {
  const { data: result, error } = await supabase
    .from('staff_members').update(data).eq('id', id).select().single()
  if (error) throw new Error(error.message)
  return result
}

export async function deleteStaffMember(id: string) {
  const { error } = await supabase.from('staff_members').delete().eq('id', id)
  if (error) throw new Error(error.message)
  return true
}

// ─── STATISTICS ──────────────────────────────────────────
export async function getStatistics() {
  const [news, events, registrations, galleries, staff] = await Promise.all([
    supabase.from('news_articles').select('is_published'),
    supabase.from('events').select('status'),
    supabase.from('player_registrations').select('status'),
    supabase.from('galleries').select('id'),
    supabase.from('staff_members').select('id'),
  ])

  const newsData = news.data || []
  const eventsData = events.data || []
  const regsData = registrations.data || []

  return {
    totalNewsArticles: newsData.length,
    publishedArticles: newsData.filter(a => a.is_published).length,
    totalEvents: eventsData.length,
    activeEvents: eventsData.filter(e => e.status === 'active').length,
    totalRegistrations: regsData.length,
    approvedRegistrations: regsData.filter(r => r.status === 'approved').length,
    pendingRegistrations: regsData.filter(r => r.status === 'pending').length,
    totalGalleries: galleries.data?.length || 0,
    totalStaff: staff.data?.length || 0,
  }
}

// ─── AUDIT LOGS ──────────────────────────────────────────
export async function logAction(
  userId: string, action: string, resource: string,
  resourceId: string, changes: Record<string, any>
) {
  await supabase.from('audit_logs').insert({
    user_id: userId, action, resource,
    resource_id: resourceId, changes,
  })
}

export async function getAuditLogs(limit = 100) {
  const { data, error } = await supabase
    .from('audit_logs').select('*')
    .order('timestamp', { ascending: false })
    .limit(limit)
  if (error) throw new Error(error.message)
  return data || []
}