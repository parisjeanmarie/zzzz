# Meditation and Mindfulness Web App

## Overview

This is a full-stack meditation and mindfulness web application built with React and Express. The app provides an immersive, calming experience similar to Calm, featuring meditation sessions with nature backgrounds and audio, mood tracking with gamification elements, and a gift store where users can unlock rewards with seeds earned through mood logging.

The application focuses on mental wellness and includes specialized meditation categories for various needs including ADHD, anxiety, stress relief, sleep, focus, and PTSD support.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Library**: Radix UI components with shadcn/ui styling system
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: React hooks with local storage persistence for user data
- **Audio Handling**: Custom useAudio hook for meditation audio playback
- **Responsive Design**: Mobile-first approach with separate navigation patterns for desktop and mobile

### Backend Architecture
- **Server**: Express.js with TypeScript
- **API Design**: RESTful API structure with /api prefix routing
- **Development Server**: Vite integration for hot module replacement in development
- **Error Handling**: Centralized error middleware with structured error responses
- **Request Logging**: Custom logging middleware for API request monitoring

### Data Storage Solutions
- **Database**: PostgreSQL configured through Drizzle ORM
- **Schema Management**: Drizzle Kit for database migrations and schema management
- **Connection**: Neon Database serverless PostgreSQL adapter
- **Local Storage**: Browser localStorage for user preferences and meditation progress
- **Session Management**: In-memory storage with planned database integration

### Authentication and Authorization
- **Current State**: Basic user schema defined with username/password structure
- **Future Implementation**: Session-based authentication with PostgreSQL session store
- **Security**: Password hashing and validation through Zod schemas

### External Dependencies
- **Database Provider**: Neon Database for serverless PostgreSQL hosting
- **Media Assets**: Unsplash API for nature background images
- **UI Components**: Extensive Radix UI component library for accessibility
- **Development Tools**: Replit integration for cloud development environment
- **Audio Sources**: Placeholder structure for royalty-free audio content
- **Font Loading**: Google Fonts integration for typography (Inter, DM Sans, Geist Mono)

### Key Features Architecture
- **Meditation System**: Card-based meditation library with category filtering, immersive overlay player with background/voice audio separation
- **Mood Tracking**: Daily mood logging with seed reward system, visual tree growth representation, calendar view of mood history
- **Gamification**: Seed-based economy, gift unlocking system with lock/unlock states, tree planting mechanics
- **Navigation**: Adaptive navigation (top bar for desktop, bottom bar for mobile), seed counter display, page state management

### Design Patterns
- **Component Architecture**: Reusable UI components with TypeScript interfaces
- **Custom Hooks**: Audio management, local storage persistence, mobile detection
- **Context Pattern**: Planned for user authentication and global state
- **Data Flow**: Props drilling with planned context migration for complex state
- **Error Boundaries**: Basic error handling with toast notifications