# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React 19 + Vite train ticket booking application. It provides a form for users to search trains by:
- From/To stations (10 stations: New Delhi, Howrah, Mumbai, Chennai, Kolkata, Kanpur, Lucknow, Bengaluru, Secunderabad, Ahmedabad)
- Travel date (next 30 days)
- Class (AC First, Vistome AC, Exec. Chair Car, AC 2 Tier, Sleeper)
- Type (General, Ladies, Lower Berth/Sr.Citizen, Person with Disability, etc.)

## Commands


```bash
npm run dev      # Start development server with HMR
npm run build    # Build for production
npm run preview # Preview production build
npm run lint     # Run ESLint
```

## Architecture

- **Entry point**: `src/main.jsx` renders the App component
- **Main component**: `src/App.jsx` contains the `Book` component with train search form
- **Train data**: Hardcoded in `src/App.jsx` (10 trains with routes, schedules)
- **Styling**: `src/styles/book.css` - uses CSS variables and flexbox layout
- **Build tool**: Vite with @vitejs/plugin-react

## Key Implementation Notes

- The `main()` function in App.jsx has a bug (incomplete condition at line 101) - needs fixing
- `dayjs` is imported but not in package.json dependencies - may need to be added
- The form uses vanilla DOM queries (`document.querySelector`) rather than React state - consider refactoring to use useState for better React patterns