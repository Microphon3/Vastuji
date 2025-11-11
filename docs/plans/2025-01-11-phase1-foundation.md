# Phase 1: Foundation Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build foundational infrastructure for Vastuji MVP including blueprint design system, database schema, and video upload capability.

**Architecture:** SvelteKit app with Tailwind CSS v4 design system, Supabase (PostgreSQL + Storage), TypeScript strict mode. Blueprint aesthetic with technical precision.

**Tech Stack:** SvelteKit, Svelte 5, TypeScript, Tailwind CSS v4, Supabase, Vitest

**Duration:** 2 weeks (Weeks 1-2 of 12-week timeline)

---

## Task 1: Design System - Color Tokens

**Goal:** Implement blueprint color palette as CSS custom properties

**Files:**

- Modify: `src/app.css`

**Step 1: Write color token test**

Create: `src/lib/design-system/colors.test.ts`

```typescript
import { describe, it, expect } from 'vitest';

describe('Design System Colors', () => {
	it('should have blueprint color tokens defined in CSS', () => {
		const root = document.documentElement;
		const styles = getComputedStyle(root);

		// Primary blueprint colors
		expect(styles.getPropertyValue('--navy-base')).toBe('#0f1528');
		expect(styles.getPropertyValue('--navy-light')).toBe('#1e2a4a');
		expect(styles.getPropertyValue('--technical-blue')).toBe('#2563eb');

		// Heat map colors
		expect(styles.getPropertyValue('--optimal-green')).toBe('#10b981');
		expect(styles.getPropertyValue('--attention-amber')).toBe('#f59e0b');
		expect(styles.getPropertyValue('--critical-red')).toBe('#ef4444');
	});
});
```

**Step 2: Run test to verify it fails**

```bash
npm run test:unit -- src/lib/design-system/colors.test.ts
```

Expected: FAIL - CSS custom properties not defined

**Step 3: Implement color tokens in app.css**

Modify: `src/app.css`

Add after `@tailwind` directives:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
	:root {
		/* Primary Blueprint Colors */
		--navy-base: #0f1528;
		--navy-light: #1e2a4a;
		--technical-blue: #2563eb;
		--grid-lines: #374151;

		/* Heat Map Colors */
		--optimal-green: #10b981;
		--optimal-green-light: #34d399;
		--attention-amber: #f59e0b;
		--attention-amber-light: #fbbf24;
		--critical-red: #ef4444;
		--critical-red-light: #f87171;
		--neutral-gray: #6b7280;

		/* Accent Colors */
		--gold-premium: #d4af37;
		--white: #ffffff;
		--black: #000000;
	}
}
```

**Step 4: Run test to verify it passes**

```bash
npm run test:unit -- src/lib/design-system/colors.test.ts
```

Expected: PASS

**Step 5: Commit**

```bash
git add src/app.css src/lib/design-system/colors.test.ts
git commit -m "feat(design): add blueprint color tokens

- Define CSS custom properties for blueprint aesthetic
- Navy/blue primary colors for technical look
- Heat map colors (green/amber/red) for zone analysis
- Premium gold accent color
- Add test coverage for color tokens"
```

---

## Task 2: Design System - Typography Configuration

**Goal:** Set up typography scale and font families for blueprint aesthetic

**Files:**

- Create: `src/lib/design-system/typography.test.ts`
- Modify: `src/app.css`
- Modify: `src/app.html`

**Step 1: Write typography test**

Create: `src/lib/design-system/typography.test.ts`

```typescript
import { describe, it, expect } from 'vitest';

describe('Design System Typography', () => {
	it('should load Inter font family', () => {
		const root = document.documentElement;
		const styles = getComputedStyle(root);
		const fontFamily = styles.getPropertyValue('font-family');

		expect(fontFamily).toContain('Inter');
	});

	it('should have typography scale defined', () => {
		const root = document.documentElement;
		const styles = getComputedStyle(root);

		expect(styles.getPropertyValue('--text-5xl')).toBe('3rem');
		expect(styles.getPropertyValue('--text-3xl')).toBe('2rem');
		expect(styles.getPropertyValue('--text-base')).toBe('1rem');
		expect(styles.getPropertyValue('--text-sm')).toBe('0.875rem');
	});
});
```

**Step 2: Run test to verify it fails**

```bash
npm run test:unit -- src/lib/design-system/typography.test.ts
```

Expected: FAIL

**Step 3: Add Google Fonts to app.html**

Modify: `src/app.html`

In `<head>` section, add before `%sveltekit.head%`:

```html
<!-- Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
	href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
	rel="stylesheet"
/>
```

**Step 4: Add typography tokens to app.css**

Modify: `src/app.css`

Add to `:root` block:

```css
:root {
	/* ... existing color tokens ... */

	/* Typography Scale */
	--text-5xl: 3rem; /* 48px - Hero headings */
	--text-3xl: 2rem; /* 32px - Section headings */
	--text-xl: 1.25rem; /* 20px - Subheadings */
	--text-base: 1rem; /* 16px - Body text */
	--text-sm: 0.875rem; /* 14px - Small text */
	--text-xs: 0.75rem; /* 12px - Tiny text */

	/* Font Families */
	--font-sans: 'Inter', system-ui, -apple-system, sans-serif;
	--font-mono: 'JetBrains Mono', 'Courier New', monospace;
}

body {
	font-family: var(--font-sans);
	font-size: var(--text-base);
	line-height: 1.5;
}
```

**Step 5: Run test to verify it passes**

```bash
npm run test:unit -- src/lib/design-system/typography.test.ts
```

Expected: PASS

**Step 6: Commit**

```bash
git add src/app.html src/app.css src/lib/design-system/typography.test.ts
git commit -m "feat(design): add typography system

- Load Inter font from Google Fonts
- Add JetBrains Mono for technical annotations
- Define typography scale tokens (5xl to xs)
- Set default body font and sizing
- Add test coverage for typography"
```

---

## Task 3: Supabase Setup - Project Configuration

**Goal:** Set up Supabase project and configure environment variables

**Files:**

- Create: `.env.local`
- Create: `.env.example`
- Modify: `.gitignore`
- Create: `src/lib/supabase.ts`

**Step 1: Create .env.example template**

Create: `.env.example`

```env
# Supabase Configuration
PUBLIC_SUPABASE_URL=your-project-url.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Supabase Storage
PUBLIC_SUPABASE_STORAGE_BUCKET=vastuji-uploads
```

**Step 2: Update .gitignore**

Modify: `.gitignore`

Add to file:

```
# Environment variables
.env
.env.local
.env.*.local
```

**Step 3: Install Supabase client**

```bash
npm install @supabase/supabase-js
```

**Step 4: Create Supabase client utility**

Create: `src/lib/supabase.ts`

```typescript
import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

if (!PUBLIC_SUPABASE_URL || !PUBLIC_SUPABASE_ANON_KEY) {
	throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);

export type Database = {
	public: {
		Tables: {
			analyses: {
				Row: Analysis;
				Insert: Omit<Analysis, 'id' | 'createdAt'>;
				Update: Partial<Analysis>;
			};
			bookings: {
				Row: Booking;
				Insert: Omit<Booking, 'id'>;
				Update: Partial<Booking>;
			};
		};
	};
};

// Type definitions will be added in next task
export interface Analysis {
	id: string;
	userId?: string;
	createdAt: string;
	propertyType: 'home' | 'office' | 'shop' | 'factory' | 'plot';
	selectedGoals?: string[];
	videoUrl: string;
	compassHeading: number;
	status: 'uploading' | 'processing' | 'complete' | 'failed';
}

export interface Booking {
	id: string;
	analysisId: string;
	userId?: string;
	name: string;
	email: string;
	phone: string;
	propertyAddress?: string;
	scheduledTime: string;
	timezone: string;
	paymentStatus: 'pending' | 'completed' | 'failed';
	amount: number;
}
```

**Step 5: Write test for Supabase client**

Create: `src/lib/supabase.test.ts`

```typescript
import { describe, it, expect } from 'vitest';
import { supabase } from './supabase';

describe('Supabase Client', () => {
	it('should initialize Supabase client', () => {
		expect(supabase).toBeDefined();
	});

	it('should have storage bucket configured', async () => {
		const { data, error } = await supabase.storage.listBuckets();
		expect(error).toBeNull();
		expect(data).toBeDefined();
	});
});
```

**Step 6: Run test**

```bash
npm run test:unit -- src/lib/supabase.test.ts
```

Expected: FAIL initially (need to configure .env.local with real credentials)

**Step 7: Manual step - Configure Supabase**

**MANUAL STEPS REQUIRED:**

1. Go to https://supabase.com
2. Create new project named "vastuji-mvp"
3. Copy Project URL and anon key
4. Create `.env.local` file with real values:

```env
PUBLIC_SUPABASE_URL=https://your-project.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your-actual-anon-key
PUBLIC_SUPABASE_STORAGE_BUCKET=vastuji-uploads
```

5. In Supabase dashboard, create storage bucket named `vastuji-uploads`
6. Set bucket to public for read access

**Step 8: Verify setup**

```bash
npm run dev
# Check no errors in console
npm run test:unit -- src/lib/supabase.test.ts
```

Expected: Tests pass after configuration

**Step 9: Commit**

```bash
git add .env.example .gitignore src/lib/supabase.ts src/lib/supabase.test.ts package.json package-lock.json
git commit -m "feat(infra): add Supabase client configuration

- Install @supabase/supabase-js
- Create Supabase client utility with type definitions
- Add environment variable template
- Configure storage bucket for video uploads
- Add gitignore rules for env files
- Add test coverage for client initialization"
```

---

## Task 4: Database Schema - Analyses Table

**Goal:** Create database schema for storing analysis data

**Files:**

- Create: `supabase/migrations/20250111000001_create_analyses_table.sql`
- Create: `src/lib/types/database.ts`

**Step 1: Create migration file**

Create: `supabase/migrations/20250111000001_create_analyses_table.sql`

```sql
-- Create analyses table
CREATE TABLE IF NOT EXISTS public.analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Input data
  property_type TEXT NOT NULL CHECK (property_type IN ('home', 'office', 'shop', 'factory', 'plot')),
  selected_goals TEXT[],
  video_url TEXT NOT NULL,
  compass_heading DECIMAL(5,2) NOT NULL CHECK (compass_heading >= 0 AND compass_heading < 360),

  -- Processing status
  status TEXT NOT NULL DEFAULT 'uploading' CHECK (status IN ('uploading', 'processing', 'complete', 'failed')),

  -- Generated outputs (stored as JSONB for flexibility)
  floor_plan JSONB,
  zones JSONB,
  summary JSONB,
  detailed_report JSONB
);

-- Add indexes for common queries
CREATE INDEX idx_analyses_user_id ON public.analyses(user_id);
CREATE INDEX idx_analyses_status ON public.analyses(status);
CREATE INDEX idx_analyses_created_at ON public.analyses(created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.analyses ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to create analyses
CREATE POLICY "Anyone can create analyses" ON public.analyses
  FOR INSERT WITH CHECK (true);

-- Users can view their own analyses, or all if anonymous
CREATE POLICY "Users can view own analyses" ON public.analyses
  FOR SELECT USING (
    auth.uid() = user_id OR user_id IS NULL
  );

-- Only authenticated users can update their own analyses
CREATE POLICY "Users can update own analyses" ON public.analyses
  FOR UPDATE USING (auth.uid() = user_id);

-- Add trigger for updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.analyses
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Add comments for documentation
COMMENT ON TABLE public.analyses IS 'Stores Vastu analysis data for properties';
COMMENT ON COLUMN public.analyses.property_type IS 'Type of property being analyzed';
COMMENT ON COLUMN public.analyses.compass_heading IS 'Device orientation in degrees (0-360)';
COMMENT ON COLUMN public.analyses.floor_plan IS 'Generated SVG floor plan and metadata';
COMMENT ON COLUMN public.analyses.zones IS 'Array of 16 zone analysis objects';
```

**Step 2: Create TypeScript types matching schema**

Create: `src/lib/types/database.ts`

```typescript
export interface Analysis {
	id: string;
	userId?: string;
	createdAt: string;
	updatedAt: string;

	// Input data
	propertyType: 'home' | 'office' | 'shop' | 'factory' | 'plot';
	selectedGoals?: string[];
	videoUrl: string;
	compassHeading: number;

	// Processing status
	status: 'uploading' | 'processing' | 'complete' | 'failed';

	// Generated outputs
	floorPlan?: FloorPlan;
	zones?: Zone[];
	summary?: AnalysisSummary;
	detailedReport?: DetailedReport;
}

export interface FloorPlan {
	svg: string;
	bounds: { width: number; height: number };
	scale: number; // meters per pixel
}

export interface Zone {
	id: number; // 1-16
	direction: Direction;
	directionSanskrit: string;
	score: number; // 0-100
	status: 'optimal' | 'attention' | 'critical';
	rooms: string[];
	briefInsight: string;
	detailedAnalysis?: string;
}

export type Direction = 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW';

export interface AnalysisSummary {
	topInsights: Insight[];
	overallScore: number; // 0-100
}

export interface Insight {
	title: string;
	severity: 'good' | 'warning' | 'critical';
	description: string;
	zone: number;
}

export interface DetailedReport {
	roomAnalysis: RoomAnalysis[];
	remedies: Remedy[];
	geometricMetrics: GeometricData;
	physicsMetrics: PhysicsData;
}

export interface RoomAnalysis {
	roomName: string;
	zone: number;
	score: number;
	issues: string[];
	recommendations: string[];
}

export interface Remedy {
	issue: string;
	recommendation: string;
	priority: 'high' | 'medium' | 'low';
	cost: 'free' | 'low' | 'medium' | 'high';
}

export interface GeometricData {
	symmetryScore: number;
	proportionRatio: number;
	goldenRatioCompliance: number;
}

export interface PhysicsData {
	solarOrientation: string;
	naturalLightScore: number;
	airflowPatternScore: number;
}

// Database helper types
export type AnalysisInsert = Omit<Analysis, 'id' | 'createdAt' | 'updatedAt'>;
export type AnalysisUpdate = Partial<Omit<Analysis, 'id' | 'createdAt'>>;
```

**Step 3: Apply migration to Supabase**

**MANUAL STEP:**

1. Go to Supabase dashboard → SQL Editor
2. Copy contents of migration file
3. Run the SQL
4. Verify table created in Table Editor

OR use Supabase CLI if installed:

```bash
# If you have Supabase CLI installed
npx supabase db push
```

**Step 4: Write test for database operations**

Create: `src/lib/database/analyses.test.ts`

```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { supabase } from '$lib/supabase';
import type { AnalysisInsert } from '$lib/types/database';

describe('Analyses Database Operations', () => {
	let testAnalysisId: string;

	const mockAnalysis: AnalysisInsert = {
		propertyType: 'home',
		selectedGoals: ['wealth', 'health'],
		videoUrl: 'https://example.com/test-video.mp4',
		compassHeading: 45.5,
		status: 'uploading'
	};

	it('should create a new analysis', async () => {
		const { data, error } = await supabase.from('analyses').insert(mockAnalysis).select().single();

		expect(error).toBeNull();
		expect(data).toBeDefined();
		expect(data?.propertyType).toBe('home');
		expect(data?.compassHeading).toBe(45.5);

		testAnalysisId = data!.id;
	});

	it('should retrieve analysis by id', async () => {
		const { data, error } = await supabase
			.from('analyses')
			.select('*')
			.eq('id', testAnalysisId)
			.single();

		expect(error).toBeNull();
		expect(data?.id).toBe(testAnalysisId);
	});

	it('should update analysis status', async () => {
		const { data, error } = await supabase
			.from('analyses')
			.update({ status: 'processing' })
			.eq('id', testAnalysisId)
			.select()
			.single();

		expect(error).toBeNull();
		expect(data?.status).toBe('processing');
	});
});
```

**Step 5: Run database tests**

```bash
npm run test:unit -- src/lib/database/analyses.test.ts
```

Expected: PASS (after Supabase configuration)

**Step 6: Commit**

```bash
git add supabase/ src/lib/types/database.ts src/lib/database/analyses.test.ts
git commit -m "feat(database): create analyses table schema

- Add Supabase migration for analyses table
- Include RLS policies for security
- Add TypeScript types matching schema
- Support JSONB for flexible floor plan and zone data
- Add indexes for performance
- Add test coverage for CRUD operations"
```

---

## Task 5: Database Schema - Bookings Table

**Goal:** Create bookings table for consultation scheduling

**Files:**

- Create: `supabase/migrations/20250111000002_create_bookings_table.sql`
- Modify: `src/lib/types/database.ts`

**Step 1: Create bookings migration**

Create: `supabase/migrations/20250111000002_create_bookings_table.sql`

```sql
-- Create bookings table
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  analysis_id UUID NOT NULL REFERENCES public.analyses(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Contact information
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  property_address TEXT,

  -- Scheduling
  scheduled_time TIMESTAMP WITH TIME ZONE NOT NULL,
  timezone TEXT NOT NULL DEFAULT 'Asia/Kolkata',

  -- Payment
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed')),
  payment_id TEXT,
  amount INTEGER NOT NULL, -- Amount in paise (₹2999 = 299900)

  -- Consultation
  consultant_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  consultation_status TEXT NOT NULL DEFAULT 'scheduled' CHECK (consultation_status IN ('scheduled', 'completed', 'cancelled')),
  notes TEXT
);

-- Add indexes
CREATE INDEX idx_bookings_analysis_id ON public.bookings(analysis_id);
CREATE INDEX idx_bookings_email ON public.bookings(email);
CREATE INDEX idx_bookings_scheduled_time ON public.bookings(scheduled_time);
CREATE INDEX idx_bookings_payment_status ON public.bookings(payment_status);

-- Enable RLS
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can create bookings" ON public.bookings
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view own bookings by email" ON public.bookings
  FOR SELECT USING (email = current_setting('request.jwt.claims', true)::json->>'email');

-- Trigger for updated_at
CREATE TRIGGER set_bookings_updated_at
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Comments
COMMENT ON TABLE public.bookings IS 'Consultation booking and payment tracking';
COMMENT ON COLUMN public.bookings.amount IS 'Amount in paise (₹1 = 100 paise)';
```

**Step 2: Add Booking type to database.ts**

Modify: `src/lib/types/database.ts`

Add after Analysis interfaces:

```typescript
export interface Booking {
	id: string;
	analysisId: string;
	userId?: string;
	createdAt: string;
	updatedAt: string;

	// Contact info
	name: string;
	email: string;
	phone: string;
	propertyAddress?: string;

	// Scheduling
	scheduledTime: string;
	timezone: string;

	// Payment
	paymentStatus: 'pending' | 'completed' | 'failed';
	paymentId?: string;
	amount: number; // in paise

	// Consultation
	consultantId?: string;
	consultationStatus: 'scheduled' | 'completed' | 'cancelled';
	notes?: string;
}

export type BookingInsert = Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>;
export type BookingUpdate = Partial<Omit<Booking, 'id' | 'createdAt'>>;
```

**Step 3: Apply migration**

**MANUAL:** Run migration SQL in Supabase dashboard

**Step 4: Write booking tests**

Create: `src/lib/database/bookings.test.ts`

```typescript
import { describe, it, expect } from 'vitest';
import { supabase } from '$lib/supabase';
import type { BookingInsert } from '$lib/types/database';

describe('Bookings Database Operations', () => {
	const mockBooking: BookingInsert = {
		analysisId: '00000000-0000-0000-0000-000000000000', // Will use real ID in practice
		name: 'Test User',
		email: 'test@example.com',
		phone: '+919876543210',
		scheduledTime: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
		timezone: 'Asia/Kolkata',
		paymentStatus: 'pending',
		amount: 299900, // ₹2999
		consultationStatus: 'scheduled'
	};

	it('should create a booking', async () => {
		const { data, error } = await supabase.from('bookings').insert(mockBooking).select().single();

		expect(error).toBeNull();
		expect(data?.email).toBe('test@example.com');
		expect(data?.amount).toBe(299900);
	});
});
```

**Step 5: Run tests**

```bash
npm run test:unit -- src/lib/database/bookings.test.ts
```

**Step 6: Commit**

```bash
git add supabase/ src/lib/types/database.ts src/lib/database/bookings.test.ts
git commit -m "feat(database): create bookings table schema

- Add migration for consultation bookings
- Include payment tracking (Razorpay integration ready)
- Add scheduling with timezone support
- Link bookings to analyses via foreign key
- Add RLS policies and indexes
- Add TypeScript types and tests"
```

---

## Task 6: Video Upload - Storage Service

**Goal:** Create service for uploading videos to Supabase Storage

**Files:**

- Create: `src/lib/services/storage.ts`
- Create: `src/lib/services/storage.test.ts`

**Step 1: Write test for video upload**

Create: `src/lib/services/storage.test.ts`

```typescript
import { describe, it, expect, vi } from 'vitest';
import { uploadVideo, generateVideoUrl } from './storage';

describe('Storage Service', () => {
	it('should upload video file and return URL', async () => {
		const mockFile = new File(['test video content'], 'test.mp4', { type: 'video/mp4' });
		const analysisId = 'test-analysis-123';

		const result = await uploadVideo(mockFile, analysisId);

		expect(result.success).toBe(true);
		expect(result.url).toContain('vastuji-uploads');
		expect(result.url).toContain(analysisId);
	});

	it('should reject non-video files', async () => {
		const mockFile = new File(['test'], 'test.txt', { type: 'text/plain' });
		const analysisId = 'test-analysis-123';

		const result = await uploadVideo(mockFile, analysisId);

		expect(result.success).toBe(false);
		expect(result.error).toContain('video');
	});

	it('should reject files larger than 100MB', async () => {
		const largeFile = new File([new ArrayBuffer(101 * 1024 * 1024)], 'large.mp4', {
			type: 'video/mp4'
		});
		const analysisId = 'test-analysis-123';

		const result = await uploadVideo(largeFile, analysisId);

		expect(result.success).toBe(false);
		expect(result.error).toContain('100MB');
	});

	it('should generate public URL for uploaded video', () => {
		const path = 'videos/test-analysis-123/video.mp4';
		const url = generateVideoUrl(path);

		expect(url).toContain('supabase');
		expect(url).toContain(path);
	});
});
```

**Step 2: Run test to verify it fails**

```bash
npm run test:unit -- src/lib/services/storage.test.ts
```

Expected: FAIL - functions not implemented

**Step 3: Implement storage service**

Create: `src/lib/services/storage.ts`

```typescript
import { supabase } from '$lib/supabase';
import { PUBLIC_SUPABASE_STORAGE_BUCKET } from '$env/static/public';

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/webm'];

export interface UploadResult {
	success: boolean;
	url?: string;
	path?: string;
	error?: string;
}

/**
 * Upload video file to Supabase Storage
 * @param file - Video file from user upload
 * @param analysisId - UUID of the analysis record
 * @returns Upload result with URL or error
 */
export async function uploadVideo(file: File, analysisId: string): Promise<UploadResult> {
	// Validate file type
	if (!ALLOWED_VIDEO_TYPES.includes(file.type)) {
		return {
			success: false,
			error: 'Invalid file type. Please upload a video file (MP4, MOV, AVI, or WebM)'
		};
	}

	// Validate file size
	if (file.size > MAX_FILE_SIZE) {
		return {
			success: false,
			error: `File too large. Maximum size is 100MB (file is ${(file.size / 1024 / 1024).toFixed(1)}MB)`
		};
	}

	// Generate unique file path
	const timestamp = Date.now();
	const fileExt = file.name.split('.').pop() || 'mp4';
	const filePath = `videos/${analysisId}/${timestamp}.${fileExt}`;

	try {
		// Upload to Supabase Storage
		const { data, error } = await supabase.storage
			.from(PUBLIC_SUPABASE_STORAGE_BUCKET)
			.upload(filePath, file, {
				cacheControl: '3600',
				upsert: false
			});

		if (error) {
			console.error('Upload error:', error);
			return {
				success: false,
				error: `Upload failed: ${error.message}`
			};
		}

		// Generate public URL
		const url = generateVideoUrl(data.path);

		return {
			success: true,
			url,
			path: data.path
		};
	} catch (err) {
		console.error('Unexpected upload error:', err);
		return {
			success: false,
			error: 'An unexpected error occurred during upload'
		};
	}
}

/**
 * Generate public URL for uploaded video
 * @param path - Storage path of the video
 * @returns Public URL
 */
export function generateVideoUrl(path: string): string {
	const { data } = supabase.storage.from(PUBLIC_SUPABASE_STORAGE_BUCKET).getPublicUrl(path);

	return data.publicUrl;
}

/**
 * Delete video from storage
 * @param path - Storage path of the video
 */
export async function deleteVideo(path: string): Promise<{ success: boolean; error?: string }> {
	try {
		const { error } = await supabase.storage.from(PUBLIC_SUPABASE_STORAGE_BUCKET).remove([path]);

		if (error) {
			return {
				success: false,
				error: error.message
			};
		}

		return { success: true };
	} catch (err) {
		return {
			success: false,
			error: 'Failed to delete video'
		};
	}
}
```

**Step 4: Run tests to verify they pass**

```bash
npm run test:unit -- src/lib/services/storage.test.ts
```

Expected: PASS

**Step 5: Commit**

```bash
git add src/lib/services/storage.ts src/lib/services/storage.test.ts
git commit -m "feat(storage): implement video upload service

- Add video file upload to Supabase Storage
- Validate file type (MP4, MOV, AVI, WebM)
- Validate file size (max 100MB)
- Generate unique file paths with analysis ID
- Return public URLs for uploaded videos
- Add delete functionality for cleanup
- Full test coverage with edge cases"
```

---

## Task 7: Blueprint Components - Grid Overlay

**Goal:** Create reusable blueprint grid component for 16-zone display

**Files:**

- Create: `src/lib/components/shared/BlueprintGrid.svelte`
- Create: `src/lib/components/shared/BlueprintGrid.test.ts`

**Step 1: Write component test**

Create: `src/lib/components/shared/BlueprintGrid.test.ts`

```typescript
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import BlueprintGrid from './BlueprintGrid.svelte';

describe('BlueprintGrid Component', () => {
	it('should render 16 zones in 4x4 grid', () => {
		const { container } = render(BlueprintGrid);
		const zones = container.querySelectorAll('[data-zone]');
		expect(zones.length).toBe(16);
	});

	it('should apply color based on zone status', () => {
		const zones = [
			{ id: 1, status: 'optimal' },
			{ id: 2, status: 'attention' },
			{ id: 3, status: 'critical' }
		];

		const { container } = render(BlueprintGrid, { zones });

		const optimal = container.querySelector('[data-zone="1"]');
		const attention = container.querySelector('[data-zone="2"]');
		const critical = container.querySelector('[data-zone="3"]');

		expect(optimal?.className).toContain('optimal');
		expect(attention?.className).toContain('attention');
		expect(critical?.className).toContain('critical');
	});

	it('should show zone number in each cell', () => {
		const { container } = render(BlueprintGrid);
		const zone5 = container.querySelector('[data-zone="5"]');
		expect(zone5?.textContent).toContain('5');
	});
});
```

**Step 2: Run test to verify it fails**

```bash
npm run test:unit -- src/lib/components/shared/BlueprintGrid.test.ts
```

Expected: FAIL - component not created

**Step 3: Implement BlueprintGrid component**

Create: `src/lib/components/shared/BlueprintGrid.svelte`

```svelte
<script lang="ts">
	import type { Zone } from '$lib/types/database';

	interface Props {
		zones?: Partial<Zone>[];
		interactive?: boolean;
		onZoneClick?: (zoneId: number) => void;
	}

	let { zones = [], interactive = false, onZoneClick }: Props = $props();

	// Create 16 zones with defaults if not provided
	const displayZones = $derived(
		Array.from({ length: 16 }, (_, i) => {
			const zoneId = i + 1;
			const existingZone = zones.find((z) => z.id === zoneId);
			return {
				id: zoneId,
				status: existingZone?.status || 'neutral',
				score: existingZone?.score || 0
			};
		})
	);

	function handleZoneClick(zoneId: number) {
		if (interactive && onZoneClick) {
			onZoneClick(zoneId);
		}
	}

	function getStatusColor(status: string): string {
		switch (status) {
			case 'optimal':
				return 'bg-optimal-green/20 border-optimal-green hover:bg-optimal-green/30';
			case 'attention':
				return 'bg-attention-amber/20 border-attention-amber hover:bg-attention-amber/30';
			case 'critical':
				return 'bg-critical-red/20 border-critical-red hover:bg-critical-red/30';
			default:
				return 'bg-neutral-gray/10 border-grid-lines hover:bg-neutral-gray/20';
		}
	}
</script>

<div
	class="blueprint-grid border-grid-lines grid aspect-square w-full grid-cols-4 grid-rows-4 gap-0 border-2"
>
	{#each displayZones as zone (zone.id)}
		<button
			data-zone={zone.id}
			class="zone-cell border-grid-lines relative border transition-all duration-200 {getStatusColor(
				zone.status
			)} {interactive ? 'cursor-pointer' : 'cursor-default'}"
			class:interactive
			onclick={() => handleZoneClick(zone.id)}
			disabled={!interactive}
		>
			<!-- Zone number -->
			<span class="absolute top-1 left-1 font-mono text-xs text-gray-400">
				{zone.id}
			</span>

			<!-- Score indicator (if available) -->
			{#if zone.score > 0}
				<div
					class="absolute right-1 bottom-1 text-xs font-bold"
					class:text-optimal-green={zone.status === 'optimal'}
					class:text-attention-amber={zone.status === 'attention'}
					class:text-critical-red={zone.status === 'critical'}
				>
					{zone.score}
				</div>
			{/if}
		</button>
	{/each}
</div>

<style>
	.zone-cell {
		min-height: 60px;
	}

	.zone-cell.interactive:hover {
		transform: scale(1.02);
		z-index: 10;
	}

	@media (min-width: 768px) {
		.zone-cell {
			min-height: 80px;
		}
	}
</style>
```

**Step 4: Run tests to verify they pass**

```bash
npm run test:unit -- src/lib/components/shared/BlueprintGrid.test.ts
```

Expected: PASS

**Step 5: Test component visually**

Create a test page: `src/routes/test-grid/+page.svelte`

```svelte
<script>
	import BlueprintGrid from '$lib/components/shared/BlueprintGrid.svelte';

	const sampleZones = [
		{ id: 1, status: 'optimal', score: 85 },
		{ id: 5, status: 'attention', score: 60 },
		{ id: 9, status: 'critical', score: 35 }
	];

	function handleZoneClick(zoneId) {
		console.log('Clicked zone:', zoneId);
	}
</script>

<div class="mx-auto max-w-2xl p-8">
	<h1 class="mb-8 text-3xl font-bold">Blueprint Grid Test</h1>

	<div class="mb-8">
		<h2 class="mb-4 text-xl">Interactive Grid</h2>
		<BlueprintGrid zones={sampleZones} interactive={true} onZoneClick={handleZoneClick} />
	</div>

	<div>
		<h2 class="mb-4 text-xl">Static Grid</h2>
		<BlueprintGrid zones={sampleZones} />
	</div>
</div>
```

**MANUAL:** Run `npm run dev`, visit `/test-grid`, verify grid renders correctly

**Step 6: Commit**

```bash
git add src/lib/components/shared/BlueprintGrid.svelte src/lib/components/shared/BlueprintGrid.test.ts src/routes/test-grid/
git commit -m "feat(components): add BlueprintGrid component

- Create 16-zone grid component with blueprint styling
- Support color coding (optimal/attention/critical)
- Interactive mode with click handlers
- Responsive design with hover effects
- Display zone numbers and scores
- Full test coverage
- Add visual test page"
```

---

## Summary: Phase 1 Foundation Complete

**Completed Tasks:**

1. ✅ Design System - Color Tokens
2. ✅ Design System - Typography Configuration
3. ✅ Supabase Setup - Project Configuration
4. ✅ Database Schema - Analyses Table
5. ✅ Database Schema - Bookings Table
6. ✅ Video Upload - Storage Service
7. ✅ Blueprint Components - Grid Overlay

**What We Built:**

- Complete blueprint design system with color and typography tokens
- Supabase infrastructure (database + storage)
- Type-safe database schemas for analyses and bookings
- Video upload service with validation
- Reusable BlueprintGrid component

**Next Steps:**

- Phase 2: Computer Vision Pipeline (Weeks 3-5)
- Phase 3: Analysis Engine (Weeks 6-8)
- Phase 4: Conversion Flow (Weeks 9-10)
- Phase 5: Polish & Testing (Weeks 11-12)

**Testing:**
Run full test suite to verify everything works:

```bash
npm run test:unit
npm run check
npm run lint
```

**Git Status:**
All changes committed with descriptive messages following conventional commits.
