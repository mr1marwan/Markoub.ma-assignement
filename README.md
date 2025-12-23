# Job Platform

A full-stack job posting and application platform built with TanStack Start, TypeScript, and PostgreSQL.

## Tech Stack

- **Frontend**: React with TanStack Start, TypeScript, Tailwind CSS
- **Backend**: Node.js with TypeScript (TanStack Start API Routes)
- **Database**: PostgreSQL with DrizzleORM
- **File Storage**: Local filesystem for PDF resumes

## Features

- Browse open positions with department filtering
- View detailed job descriptions
- Apply to specific positions or spontaneously
- PDF resume upload (2MB max)
- Admin dashboard to manage positions and view applications

## Quick Start

### Prerequisites

- Node.js >= 18.x
- npm or yarn
- PostgreSQL database (we recommend [Neon.tech](https://neon.tech) free tier)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd job-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**

   Create a `.env` file (or copy from `.env.example`):
   ```env
   DATABASE_URL=your_neon_connection_string_here
   PORT=3000
   ```

4. **Setup database**
   ```bash
   npm run db:push    # Create tables
   npm run db:seed    # Add sample data
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run db:push` | Push database schema changes |
| `npm run db:seed` | Seed database with sample positions |
| `npm run db:studio` | Open Drizzle Studio (database GUI) |

## Project Structure

```
src/
├── routes/
│   ├── index.tsx              # Positions list page
│   ├── positions.$id.tsx      # Job detail page
│   ├── admin/
│   │   └── index.tsx         # Admin dashboard
│   └── api/
│       ├── positions.ts       # Positions API
│       ├── positions.$id.ts   # Single position API
│       └── applications.ts    # Applications API
├── db/
│   ├── schema.ts             # Database schema
│   ├── index.ts              # Database connection
│   └── seed.ts               # Sample data
└── components/               # Reusable components
```

## Database Setup with Neon

1. Create a free account at [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string from the dashboard
4. Update `DATABASE_URL` in your `.env` file
5. Run `npm run db:push && npm run db:seed`

## Application Pages

- **Home**: `http://localhost:3000/` - Browse all open positions
- **Job Details**: `http://localhost:3000/positions/:id` - View job details and apply
- **Admin**: `http://localhost:3000/admin` - Manage positions and applications

> **Note**: The admin area is publicly accessible for this demo. In production, authentication would be required.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/positions` | List all positions (supports `?department=` filter) |
| GET | `/api/positions/:id` | Get single position |
| POST | `/api/positions` | Create new position |
| PUT | `/api/positions/:id` | Update position |
| DELETE | `/api/positions/:id` | Delete position |
| GET | `/api/applications` | List all applications |
| POST | `/api/applications` | Submit job application (with PDF upload) |

## Key Features & Decisions

- **Full-stack TypeScript**: Type safety across frontend and backend
- **DrizzleORM**: Type-safe database queries with excellent TypeScript support
- **File-based routing**: Intuitive routing with TanStack Start
- **Form validation**: Client and server-side validation for all inputs
- **PDF uploads**: Secure file upload with size and type validation
- **Responsive design**: Clean UI that works on all devices

## Sample Data

The seed script creates 6 sample job positions across different departments:
- Software Engineer (Engineering)
- UX Designer (Design)
- Product Manager (Product)
- Graphic Designer (Design)
- Marketing Manager (Marketing)
- Account Manager (Customer Success)

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host/db` |
| `PORT` | Application port | `3000` |

## Note on File Storage

For this demo, PDF resumes are stored locally in the `uploads/` folder.

**Production Considerations:**
In a production environment deployed on serverless platforms (Vercel, Netlify, etc.),
file storage would be migrated to cloud storage solutions such as:
- Cloudflare R2 (recommended for generous free tier)
- Supabase Storage
- AWS S3

The current implementation can be easily adapted by updating the file upload
handler in `src/routes/api/applications.ts`.

---

Built with TanStack Start, TypeScript, PostgreSQL, and DrizzleORM
