# GitHub Star Ranker

Search and rank GitHub engineers by star count per programming language.

## Features

- Select a programming language and view top-starred repositories and their owners
- Click a user to see detailed profile and repository breakdown
- Fast language switching with proper request cancellation
- Cached results for previously searched languages

## Tech Stack

- React 19 + TypeScript
- Vite
- TanStack Query

## Learning Goals

This project demonstrates the following React best practices:

### 1. useEffect Dependency Arrays
Dependencies are determined by the values used inside the effect — not chosen by the developer. ESLint's `exhaustive-deps` rule enforces this automatically.

### 2. Data Fetching
- **AbortController** cancels in-flight HTTP requests on cleanup (not just state updates)
- **TanStack Query** handles caching, deduplication, loading states, and cancellation out of the box
- Why `useEffect` + `fetch` is discouraged by the React team for production data fetching

### 3. Component Design over Context API
- Props drilling is first solved by **component composition** (passing JSX as props)
- Context API is reserved for truly global values (theme, locale, auth)
- Server data sharing is handled by TanStack Query's cache, not Context

## Getting Started

```bash
npm install
npm run dev
```

## License

MIT
