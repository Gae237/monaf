export type UserRole = 'super-admin' | 'admin' | 'editor' | 'viewer'

export interface AdminUser {
  id: string
  email: string
  password: string
  name: string
  role: UserRole
  createdAt: Date
  lastLogin?: Date
  isActive: boolean
}

export interface Permission {
  id: string
  name: string
  description: string
}

export interface RolePermission {
  role: UserRole
  permissions: string[]
}

export interface Gallery {
  id: string
  title: string
  description: string
  images: GalleryImage[]
  season: string
  category: string
  isPublic: boolean
  createdAt: Date
  updatedAt: Date
}

export interface GalleryImage {
  id: string
  url: string
  caption: string
  type: 'photo' | 'video'
  uploadedAt: Date
  uploadedBy: string
}

export interface NewsArticle {
  id: string
  title: string
  content: string
  excerpt: string
  featuredImage: string
  category: string
  author: string
  publishedAt: Date
  updatedAt: Date
  isPublished: boolean
  scheduledFor?: Date
}

export interface Event {
  id: string
  title: string
  description: string
  date: Date
  location: string
  posterImage: string
  category: string
  status: 'active' | 'cancelled' | 'completed'
  createdBy: string
  createdAt: Date
}

// Type pour les données retournées par Supabase (snake_case)
export interface PlayerRegistration {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  category: string
  programType: string
  status: 'pending' | 'approved' | 'rejected'
  registeredAt: string
  notes?: string
  photo_url?: string
}

export interface StaffMember {
  id: string
  name: string
  position: string
  email: string
  phone: string
  profileImage: string
  role: string
  createdAt: Date
  updatedAt: Date
}

export interface AuditLog {
  id: string
  userId: string
  action: string
  resource: string
  resourceId: string
  changes: Record<string, any>
  timestamp: Date
  ipAddress?: string
}
