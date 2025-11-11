# Vastuji

A SvelteKit application for Vastu analysis with AI-powered insights.

## Tech Stack

- **Framework**: SvelteKit with Svelte 5
- **Language**: TypeScript
- **Database**: MySQL 8.0 (via Docker)
- **Styling**: Tailwind CSS v4
- **Storage**: Local file system

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- Docker and Docker Compose
- npm

### Setup

1. **Clone the repository**

```bash
git clone <repository-url>
cd Vastuji
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Copy the example environment file and update with your values:

```bash
cp .env.example .env
```

Default MySQL credentials (for local development):
- Host: localhost
- Port: 3306
- Database: vastuji
- User: vastuji_user
- Password: vastuji_pass

4. **Start MySQL with Docker Compose**

```bash
docker-compose up -d
```

This will:
- Start MySQL 8.0 in a Docker container
- Create the `vastuji` database
- Automatically run migrations on first startup
- Persist data in a Docker volume

5. **Initialize the database** (if migrations didn't run automatically)

```bash
./scripts/init-db.sh
```

6. **Start the development server**

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run check` - Run TypeScript and Svelte type checking
- `npm run check:watch` - Type checking in watch mode
- `npm run format` - Format code with Prettier
- `npm run lint` - Check code formatting with Prettier and ESLint
- `npm run test` - Run all tests (e2e + unit)
- `npm run test:e2e` - Run Playwright end-to-end tests
- `npm run test:unit` - Run Vitest unit tests

### Database Management

**View MySQL logs:**
```bash
docker-compose logs -f mysql
```

**Connect to MySQL:**
```bash
docker exec -it vastuji-mysql mysql -uvastuji_user -pvastuji_pass vastuji
```

**Stop MySQL:**
```bash
docker-compose down
```

**Stop MySQL and remove data:**
```bash
docker-compose down -v
```

**Run migrations manually:**
```bash
./scripts/init-db.sh
```

### File Storage

Video uploads are stored locally in the `uploads/videos/` directory. Each analysis has its own subdirectory.

The uploads directory is gitignored but the structure is preserved with `.gitkeep`.

## Project Structure

```
/Users/tanmaybahulekar/Sites/Vastuji/
├── docker-compose.yml          # MySQL Docker setup
├── migrations/                 # Database migration files
│   ├── 001_create_analyses_table.sql
│   └── 002_create_bookings_table.sql
├── scripts/                    # Utility scripts
│   └── init-db.sh             # Database initialization
├── src/
│   ├── lib/
│   │   ├── db.ts              # MySQL connection utility
│   │   ├── database/          # Database service functions
│   │   │   ├── analyses.ts
│   │   │   └── bookings.ts
│   │   ├── services/          # Business logic services
│   │   │   └── storage.ts     # Local file storage
│   │   ├── types/             # TypeScript type definitions
│   │   └── components/        # Svelte components
│   └── routes/                # SvelteKit routes
├── uploads/                   # Local file storage (gitignored)
│   └── videos/               # Video uploads by analysis ID
└── static/                   # Static assets
```

## Testing

The project uses Vitest for unit tests and Playwright for end-to-end tests.

**Run all tests:**
```bash
npm test
```

**Run unit tests in watch mode:**
```bash
npm run test:unit
```

**Run e2e tests:**
```bash
npm run test:e2e
```

## Database Schema

### Analyses Table

Stores Vastu analysis data for properties.

- `id` - VARCHAR(36), Primary key (UUID)
- `user_id` - VARCHAR(36), Optional user reference
- `property_type` - ENUM('home', 'office', 'shop', 'factory', 'plot')
- `selected_goals` - JSON array
- `video_url` - VARCHAR(2048), URL to uploaded video
- `compass_heading` - DECIMAL(5,2), 0-360 degrees
- `status` - ENUM('uploading', 'processing', 'complete', 'failed')
- `floor_plan` - JSON, Generated SVG and metadata
- `zones` - JSON, Array of 16 zone analysis objects
- `summary` - JSON, Analysis summary with insights
- `detailed_report` - JSON, Complete analysis report
- `created_at` - TIMESTAMP
- `updated_at` - TIMESTAMP (auto-updated)

### Bookings Table

Stores consultation booking and payment data.

- `id` - VARCHAR(36), Primary key (UUID)
- `analysis_id` - VARCHAR(36), Foreign key to analyses
- `user_id` - VARCHAR(36), Optional user reference
- `name` - VARCHAR(255)
- `email` - VARCHAR(255)
- `phone` - VARCHAR(20)
- `property_address` - TEXT
- `scheduled_time` - TIMESTAMP
- `timezone` - VARCHAR(100)
- `payment_status` - ENUM('pending', 'completed', 'failed')
- `payment_id` - VARCHAR(255)
- `amount` - INT, Amount in paise
- `consultant_id` - VARCHAR(36)
- `consultation_status` - ENUM('scheduled', 'completed', 'cancelled')
- `notes` - TEXT
- `created_at` - TIMESTAMP
- `updated_at` - TIMESTAMP (auto-updated)

## License

Private project.
