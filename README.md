# Olympic Monaf Sport Academy (OMSA) - Admin System

A comprehensive full-stack web application for the Olympic Monaf Sport Academy in Yaoundé, Cameroon, featuring both a public website and a secure admin panel for content management.

## Features

### Public Website
- **Home Page**: Hero section with academy overview, program highlights, and news feed
- **About Page**: Academy history, mission, vision, and admission requirements
- **Programs Page**: Detailed information about Sport-Études, Boarding, and Day programs
- **Categories Page**: Age groups (U8-U17) with program information
- **Gallery**: Filterable photos and videos organized by season and category
- **News**: Blog-style news, match results, and tournament summaries
- **Staff**: Team members with contact information
- **Contact**: Contact form and location information

### Admin Panel

#### Authentication & Security
- **Secure Login**: Email and password authentication
- **Role-Based Access Control**: 4 user roles with granular permissions
  - **Super Admin**: Full system access, user management
  - **Admin**: All content management features
  - **Editor**: News and media uploads only
  - **Viewer**: Dashboard and read-only access
- **Session Management**: Automatic login state management
- **Rate Limiting Ready**: Foundation for implementing login attempt limits

#### Content Management

**Dashboard**
- Real-time statistics (articles, events, registrations, staff)
- Quick action cards for fast content creation
- Visual charts showing content overview

**Gallery Management**
- Album creation with seasonal sorting (2023-2025, 2024-2025, etc.)
- Category filtering (U8, U10, U12, U13, U15, U17)
- Public/private album toggle
- Image and video uploads (structure in place)
- Bulk upload support

**News & Articles**
- Create, edit, publish articles
- Category-based organization (U15, U17, Feminine, Results, Tournaments)
- Draft and published states
- Featured image support
- Schedule posts for later publishing

**Events Management**
- Create tournaments, matches, and announcements
- Date and location tracking
- Status management (active, cancelled, completed)
- Automatic publication to main website
- Category assignments

**Registration Management**
- View all player applications
- Search and filter by name, email, category
- Approve or reject registrations
- Track registration status
- Download capabilities (structure ready for Excel/PDF export)

**Staff Management**
- Add, edit, delete team members
- Role assignments (Coach, Assistant Coach, Physio, Manager, Admin)
- Contact information storage
- Profile image support

**User Management** (Super Admin only)
- Create new admin accounts
- Assign roles and permissions
- Deactivate users
- Change user roles
- View login history

## Getting Started

### Installation

1. Download the project from v0
2. Use the shadcn CLI to install:
   \`\`\`bash
   npx shadcn-cli@latest init
   \`\`\`
3. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
4. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`
5. Open [http://localhost:3000](http://localhost:3000)

### Default Admin Credentials

\`\`\`
Email: admin@omsa.com
Password: Admin@123456
\`\`\`

**Important**: Change these credentials immediately in production.

## Admin Access

- **Public Site**: http://localhost:3000
- **Admin Login**: http://localhost:3000/admin/login
- **Admin Dashboard**: http://localhost:3000/admin/dashboard (after login)

### Navigation Links

From the main website, click the "Admin" button in the navigation bar to access the login page.

## Architecture

### Frontend
- **Framework**: Next.js 15 with App Router
- **UI Components**: shadcn/ui with Tailwind CSS v4
- **State Management**: Client-side with localStorage
- **Data Fetching**: In-memory storage (easily replaceable with database)

### Authentication Flow
1. User logs in at `/admin/login`
2. Credentials verified against stored users
3. User data stored in localStorage
4. Admin layout checks authentication on mount
5. Unauthorized access redirects to login

### Data Layer
- **File**: `lib/content-service.ts`
- **In-Memory Storage**: Simulates database (data persists per session)
- **CRUD Operations**: Full create, read, update, delete support
- **Filtering & Search**: Built-in query capabilities
- **Statistics**: Aggregated data for dashboard

### Type Safety
- **File**: `lib/types.ts`
- **TypeScript Interfaces**: All entities fully typed
- **Enum-like Types**: UserRole with specific values
- **Type Definitions**: For all admin features

## Security Considerations

### Current Implementation
- Role-based access control via permission checking
- Password verification system
- Session management with localStorage
- Protected admin routes with authentication checks

### Production Recommendations
- Replace in-memory storage with database (Supabase, PostgreSQL, etc.)
- Implement bcrypt for password hashing
- Add rate limiting for login attempts
- Use secure HTTP-only cookies for sessions
- Implement JWT or session tokens
- Add audit logging to database
- Enable HTTPS in production
- Implement 2FA (two-factor authentication)
- Add IP whitelisting for admin access
- Regular security audits

## Customization

### Adding New Content Types
1. Define type in `lib/types.ts`
2. Create CRUD functions in `lib/content-service.ts`
3. Create admin page in `app/admin/[feature]/page.tsx`
4. Add navigation link in `components/admin/admin-navigation.tsx`

### Connecting to a Database
1. Install database client (e.g., `@supabase/supabase-js`)
2. Replace in-memory storage in `lib/content-service.ts`
3. Update authentication in `lib/auth-service.ts`
4. Migrate API calls to server actions or route handlers

### Styling
- All styling uses Tailwind CSS v4
- Design tokens defined in `app/globals.css`
- Color scheme: Blue (#1e3a8a) and white with gray accents

## File Structure

\`\`\`
app/
├── admin/
│   ├── dashboard/page.tsx
│   ├── gallery/page.tsx
│   ├── news/page.tsx
│   ├── events/page.tsx
│   ├── registrations/page.tsx
│   ├── staff/page.tsx
│   ├── users/page.tsx
│   ├── login/page.tsx
│   └── layout.tsx
├── globals.css
└── layout.tsx
components/
├── admin/
│   └── admin-navigation.tsx
├── ui/
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   └── [other UI components]
lib/
├── types.ts
├── auth-service.ts
└── content-service.ts
\`\`\`

## Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables if needed
4. Click Deploy

\`\`\`bash
npm run build
npm start
\`\`\`

## Future Enhancements

- Database integration (Supabase, Neon, or similar)
- Email notifications for new registrations
- PDF export for registrations and reports
- Advanced image editing and cropping
- Two-factor authentication (2FA)
- Audit logs with detailed change tracking
- Content scheduling and automation
- Media library with advanced search
- API for third-party integrations
- Mobile app for admin functions
- Real-time notifications
- Analytics and reporting dashboard

## Support

For issues or questions, contact the development team or visit the OMSA website.

## License

All rights reserved © Olympic Monaf Sport Academy
