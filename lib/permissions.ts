import { UserRole } from './types'

export const PERMISSIONS = {
  gallery: ['super-admin'],
  news: ['super-admin'],
  events: ['super-admin'],
  staff: ['super-admin'],
  registrations: ['super-admin', 'admin'],
  users: ['super-admin'],
}

export function canEdit(role: UserRole, section: keyof typeof PERMISSIONS): boolean {
  return PERMISSIONS[section].includes(role)
}