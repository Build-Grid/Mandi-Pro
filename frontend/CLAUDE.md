# CLAUDE.md

## How to Work on This Project

### When adding new features:

1. Create feature folder under `/features`
2. Add:
    - hooks
    - types
    - API calls
    - components

### State Management Rules

- Server state → React Query
- UI state → Zustand
- NEVER mix both

### API Integration

- Always use `apiClient`
- Do not call `fetch` directly
- Handle errors using global error handler

### Authentication

- Uses cookies (httpOnly)
- Do NOT store tokens in localStorage

### UI Guidelines

- Use Tailwind CSS
- Follow existing design system
- Maintain consistent spacing and colors

### Performance Rules

- Use `useMemo` and `useCallback` where needed
- Avoid unnecessary re-renders
- Lazy load heavy components

### Common Mistakes to Avoid

- ❌ Storing API data in Zustand
- ❌ Calling APIs directly inside components
- ❌ Ignoring loading/error states
