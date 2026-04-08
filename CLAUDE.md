# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Train ticket booking application built with React 19 + Vite. Provides train search and booking functionality with user authentication.

## Commands

```bash
npm run dev      # Start development server with HMR
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Architecture

- **Entry point**: `src/main.jsx` renders App component
- **Routing**: React Router v7 in `src/App.jsx` with BrowserRouter wrapping all routes
- **Train data**: Hardcoded in `data/data.jsx` - 10 trains with routes, schedules, classes
- **Auth/Bookings**: Stored in localStorage (`currentUser`, `bookings`)
- **Global layout**: `Navbar` and `Footer` components wrap all pages

## Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | Home | Landing page with typewriter animation |
| `/search` | Search | Train search results with sorting |
| `/book` | Book | Booking confirmation page |
| `/mybooks` | MyBooks | User's booked tickets |
| `/login` | Login | User login page |
| `/track` | TrackTrain | Train tracking page |

## Styling

- CSS files in `src/styles/` - one per component (Home.css, Navbar.css, Footer.css, Search.css, book.css)
- Color scheme: dark navy (`#1a1a2e`) primary, pink accent (`#e94560`)
- Responsive breakpoints at 768px and 480px

## Component Patterns

- Components receive data via React Router `useLocation().state` or localStorage
- User authentication checked via `localStorage.getItem('currentUser')`
- Bookings stored in `localStorage.getItem('bookings')` as JSON array
- User change events dispatched via `window.dispatchEvent(new Event('userChanged'))`
