import { supabase } from './supabase'
import { AdminUser, UserRole } from './types'
import bcrypt from 'bcryptjs'

const rolePermissions: Record<UserRole, string[]> = {
  'super-admin': [
    'manage_users', 'manage_roles', 'delete_content',
    'edit_gallery', 'upload_media', 'manage_news',
    'manage_events', 'manage_registrations', 'manage_staff',
    'view_audit_logs', 'system_settings',
  ],
  admin: [
    'edit_gallery', 'upload_media', 'manage_news',
    'manage_events', 'manage_registrations', 'manage_staff',
    'view_audit_logs',
  ],
  editor: ['manage_news', 'upload_media'],
  viewer: ['view_dashboard'],
}

export async function login(email: string, password: string): Promise<AdminUser | null> {
  const { data, error } = await supabase
    .from('admin_users')
    .select('*')
    .eq('email', email)
    .eq('is_active', true)
    .single()

  if (error || !data) return null

  const valid = await bcrypt.compare(password, data.password)
  if (!valid) return null

  // Update last login
  await supabase
    .from('admin_users')
    .update({ last_login: new Date().toISOString() })
    .eq('id', data.id)

  const user: AdminUser = {
    id: data.id,
    email: data.email,
    password: '',
    name: data.name,
    role: data.role,
    isActive: data.is_active,
    createdAt: new Date(data.created_at),
    lastLogin: new Date(),
  }

  if (typeof window !== 'undefined') {
    localStorage.setItem('adminUser', JSON.stringify(user))
  }

  return user
}

export function logout(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('adminUser')
  }
}

export function getCurrentUser(): AdminUser | null {
  if (typeof window === 'undefined') return null
  const stored = localStorage.getItem('adminUser')
  if (!stored) return null
  try {
    return JSON.parse(stored)
  } catch {
    return null
  }
}

export function hasPermission(role: UserRole, permission: string): boolean {
  return (rolePermissions[role] || []).includes(permission)
}

export function checkUserPermission(permission: string): boolean {
  const user = getCurrentUser()
  if (!user) return false
  return hasPermission(user.role, permission)
}

export async function createUser(
  user: Omit<AdminUser, 'id' | 'createdAt'>
): Promise<AdminUser> {
  const hashed = await bcrypt.hash(user.password, 10)
  const { data, error } = await supabase
    .from('admin_users')
    .insert({ ...user, password: hashed, is_active: user.isActive })
    .select()
    .single()

  if (error) throw new Error(error.message)
  return { ...data, isActive: data.is_active, createdAt: new Date(data.created_at) }
}

export async function getAllUsers(): Promise<AdminUser[]> {
  const { data } = await supabase.from('admin_users').select('*')
  return (data || []).map(u => ({ ...u, isActive: u.is_active, createdAt: new Date(u.created_at) }))
}