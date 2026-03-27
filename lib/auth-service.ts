import { UserRole, AdminUser, RolePermission } from './types'

// In-memory storage (for demo - replace with database)
let adminUsers: Map<string, AdminUser> = new Map()
let currentUser: AdminUser | null = null

// Initialize with default super admin
function initializeDefaults() {
  if (adminUsers.size === 0) {
    const superAdmin: AdminUser = {
      id: 'super-admin-1',
      email: 'admin@omsa.com',
      password: hashPassword('Admin@123456'), // In production, use proper hashing
      name: 'Super Administrator',
      role: 'super-admin',
      createdAt: new Date(),
      isActive: true,
    }
    adminUsers.set(superAdmin.email, superAdmin)
  }
}

// Simple password hashing (for demo - use bcrypt in production)
export function hashPassword(password: string): string {
  return Buffer.from(password).toString('base64')
}

export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash
}

// Role-based permissions
const rolePermissions: Record<UserRole, string[]> = {
  'super-admin': [
    'manage_users',
    'manage_roles',
    'delete_content',
    'edit_gallery',
    'upload_media',
    'manage_news',
    'manage_events',
    'manage_registrations',
    'manage_staff',
    'view_audit_logs',
    'system_settings',
  ],
  admin: [
    'edit_gallery',
    'upload_media',
    'manage_news',
    'manage_events',
    'manage_registrations',
    'manage_staff',
    'view_audit_logs',
  ],
  editor: [
    'manage_news',
    'upload_media',
  ],
  viewer: [
    'view_dashboard',
  ],
}

// Authentication methods
export function login(email: string, password: string): AdminUser | null {
  initializeDefaults()
  const user = adminUsers.get(email)
  
  if (!user || !verifyPassword(password, user.password)) {
    return null
  }
  
  if (!user.isActive) {
    return null
  }
  
  user.lastLogin = new Date()
  currentUser = user
  localStorage.setItem('adminUser', JSON.stringify(user))
  
  return user
}

export function logout(): void {
  currentUser = null
  localStorage.removeItem('adminUser')
}

export function getCurrentUser(): AdminUser | null {
  if (typeof window === 'undefined') return null
  
  if (currentUser) return currentUser
  
  const stored = localStorage.getItem('adminUser')
  if (stored) {
    try {
      currentUser = JSON.parse(stored)
      return currentUser
    } catch {
      return null
    }
  }
  
  return null
}

export function hasPermission(role: UserRole, permission: string): boolean {
  const permissions = rolePermissions[role] || []
  return permissions.includes(permission)
}

export function checkUserPermission(permission: string): boolean {
  const user = getCurrentUser()
  if (!user) return false
  return hasPermission(user.role, permission)
}

export function canDeleteAdmin(targetRole: UserRole, currentRole: UserRole): boolean {
  if (currentRole !== 'super-admin') return false
  if (targetRole === 'super-admin') return false
  return true
}

// User management (Super Admin only)
export function createUser(user: Omit<AdminUser, 'id' | 'createdAt'>): AdminUser {
  initializeDefaults()
  const current = getCurrentUser()
  
  if (!current || current.role !== 'super-admin') {
    throw new Error('Only super admins can create users')
  }
  
  const newUser: AdminUser = {
    ...user,
    id: `user-${Date.now()}`,
    createdAt: new Date(),
    password: hashPassword(user.password),
  }
  
  adminUsers.set(user.email, newUser)
  return newUser
}

export function getAllUsers(): AdminUser[] {
  initializeDefaults()
  return Array.from(adminUsers.values())
}

export function getUserByEmail(email: string): AdminUser | null {
  initializeDefaults()
  return adminUsers.get(email) || null
}

export function updateUserRole(email: string, newRole: UserRole): void {
  const user = adminUsers.get(email)
  if (user) {
    user.role = newRole
  }
}

export function deactivateUser(email: string): void {
  const user = adminUsers.get(email)
  if (user) {
    user.isActive = false
  }
}
