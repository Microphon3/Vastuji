# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

**Vastuji** is a SvelteKit web application that provides Vastu Shastra (ancient Indian architectural science) analysis using modern web technologies. The app uses computer vision and device sensors to analyze spaces and provide directional energy flow insights.

## Tech Stack

- **Framework**: SvelteKit with Svelte 5 (runes syntax: `$props()`, `$state()`)
- **Language**: TypeScript (strict mode enabled)
- **Styling**: Tailwind CSS v4 (via `@tailwindcss/vite` plugin)
- **Build Tool**: Vite
- **Testing**:
  - Vitest with dual-environment setup (client browser tests via Playwright, server node tests)
  - Playwright for end-to-end testing
- **Code Quality**: ESLint (flat config) + Prettier

## Development Commands

### Core Development
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Testing
- `npm run test` - Run all tests (e2e + unit)
- `npm run test:e2e` - Run Playwright end-to-end tests only
- `npm run test:unit` - Run Vitest unit tests in watch mode
- `npm run test:unit -- --run` - Run unit tests once (non-watch)

### Code Quality
- `npm run check` - Run SvelteKit sync and svelte-check type checking
- `npm run check:watch` - Type checking in watch mode
- `npm run format` - Format code with Prettier
- `npm run lint` - Check formatting with Prettier and run ESLint

## Architecture & Key Patterns

### Application Flow
1. **Password Protection**: Root layout (`+layout.svelte`) enforces password authentication ("yogesh") using sessionStorage
2. **Multi-Step User Journey**: Landing page (`+page.svelte`) implements a state machine with steps:
   - `welcome` → `propertyType` → `goals` → `camera` → `capturing` → `results`
3. **Device Integration**: Uses MediaDevices API for camera access and DeviceOrientationEvent for compass heading

### Testing Architecture
The codebase uses **dual-environment Vitest configuration** (vite.config.ts:7-35):
- **Client tests** (`.svelte.{test,spec}.{js,ts}`): Run in browser environment via Playwright/Chromium, test Svelte components
- **Server tests** (`.{test,spec}.{js,ts}` excluding `.svelte.*`): Run in Node environment, test server-side logic
- **E2E tests**: Playwright tests run against built application on port 4173

### Route Structure
- `/` - Main landing and scan interface with multi-step flow
- `/scan`, `/setup`, `/report`, `/report/full` - Analysis workflow pages
- `/consultation`, `/knowledge` - Information pages
- `/home-vastu`, `/office-vastu` - Property type specific pages

### Component Library
- Components live in `src/lib/components/`
- Exports are aggregated through `src/lib/index.ts` (barrel export pattern)
- Custom components: `VastuLogo.svelte`, `VastuIcons.svelte`, `OrbitingCircles.svelte`

### Svelte 5 Patterns
- Uses modern runes syntax: `$props()`, `$state()`, `$derived`, etc.
- Components use `let { children } = $props()` for slot-like behavior
- Reactive state management with `$state()` instead of stores

### Browser-Safe Code
- Uses `browser` from `$app/environment` to guard client-only code
- Device APIs (camera, orientation) wrapped in browser checks
- `onMount()` lifecycle for client-side initialization

### TypeScript Configuration
- Extends `.svelte-kit/tsconfig.json` for SvelteKit-generated types
- Strict mode enabled with comprehensive type checking
- Path alias `$lib` handled by SvelteKit configuration

## Brand & Domain Context

**Vastu Shastra** is a 5000+ year old Indian architectural science focusing on:
- **16 Sacred Zones**: Space divided into 4x4 grid with specific energies
- **5 Elements**: Earth, Water, Fire, Air, Space balance
- **Directional Analysis**: 8 cardinal/ordinal directions (North/उत्तर, NE/ईशान, etc.)
- **45 Devtas**: Energy deities governing different zones

The app analyzes properties (home, office, shop, factory, plot) for goals like wealth, health, career, marriage, peace, and business success.
