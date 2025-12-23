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

## Quick Start (with Docker)

### Prerequisites

- Node.js >= 18.x
- npm or yarn
- Docker and Docker Compose

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mr1marwan/Markoub.ma-assignement.git
   cd Markoub.ma-assignement
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the database**
   ```bash
   docker compose up -d
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

### Alternative: Using Neon (No Docker needed)

If you prefer not to use Docker, you can use Neon's free PostgreSQL database:

1. Create a free account at [neon.tech](https://neon.tech)
2. Copy your connection string
3. Create a `.env` file and update:
   ```env
   DATABASE_URL=your_neon_connection_string_here
   PORT=3000
   ```
4. Run `npm run db:push && npm run db:seed && npm run dev`

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

## Database Setup

### Local Development (Docker)

The default `.env.example` is configured for Docker. Simply:

```bash
docker compose up -d
npm run db:push
npm run db:seed
```

### Production Deployment (Neon)

The application automatically detects Neon connections and uses the appropriate database driver.

**For Vercel deployment:**
1. Add environment variable in Vercel dashboard
2. Set `DATABASE_URL` to your Neon connection string
3. Deploy - it will automatically use the Neon HTTP driver

**Local testing with Neon:**
1. Create a free account at [neon.tech](https://neon.tech)
2. Copy the connection string from the dashboard
3. Update `DATABASE_URL` in your `.env` file
4. Run `npm run db:push && npm run db:seed`

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
