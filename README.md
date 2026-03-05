# Recipe Collection

A simple recipe management application built with Payload CMS and Next.js.

## Getting Started Locally

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm/yarn
- MongoDB (local or Docker)

### Option 1: Docker (Recommended)

The easiest way to get started with Docker:

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd recipes
   ```

2. **Start the containers**

   ```bash
   docker compose up -d
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Admin Panel: http://localhost:3000/admin
   - MongoDB: localhost:27017

That's it! Docker handles the database and application setup automatically.

### Option 2: Local Development

If you prefer to run everything locally:

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd recipes
   ```

2. **Set up environment**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and set your `DATABASE_URL` to your MongoDB connection string.

3. **Install dependencies**

   ```bash
   pnpm install
   ```

4. **Start the development server**

   ```bash
   pnpm dev
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Admin Panel: http://localhost:3000/admin

## Project Structure

```
src/app/
├── layout.tsx              # Root layout with HTML structure
├── page.tsx                # Homepage
├── (payload)/              # Admin route group
│   ├── layout.tsx          # Payload admin layout
│   └── admin/              # Admin panel routes
├── recipes/
│   └── [slug]/
│       └── page.tsx        # Recipe detail pages
└── api/                    # Payload API routes
```

## Development Commands

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Generate Payload types
pnpm generate:types

# Run tests
pnpm test
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

- `DATABASE_URL`: MongoDB connection string
- `PAYLOAD_SECRET`: Secret for Payload authentication

## Troubleshooting

### Docker Issues

- Make sure Docker is running
- Check `docker compose logs` for errors
- Try `docker compose down && docker compose up -d` to restart

### Admin Panel Errors

- Ensure MongoDB is running
- Check your `.env` file is configured correctly
- Clear browser cache and refresh

### Route Issues

- The app uses a route group only for the admin panel
- Admin routes use `(payload)` layout to avoid HTML nesting conflicts
- Frontend routes use the root layout
