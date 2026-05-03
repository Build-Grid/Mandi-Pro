# AGENTS.md

## Project Overview

This is a Next.js frontend for Mandi-Pro, a mandi management platform.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- React Query
- Zustand

## Coding Guidelines

- Use functional components only
- Prefer hooks over class components
- Keep components small and reusable
- Use React Query for server state
- Do NOT store API data in Zustand

## API Rules

- All API calls must go through `apiClient`
- Use cookies for authentication (no localStorage for tokens)

## Folder Structure

- `/features` → domain-based modules
- `/lib` → utilities
- `/store` → Zustand state

## Important Notes

- Always validate forms
- Avoid unnecessary re-renders
- Follow strict TypeScript typing
