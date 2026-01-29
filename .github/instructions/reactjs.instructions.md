---
description: "ReactJS development standards and best practices"
applyTo: "**/*.jsx, **/*.tsx, **/*.js, **/*.ts, **/*.css, **/*.scss"
---

# ReactJS Development Instructions

Build React applications following https://react.dev patterns.

## Core Patterns

- **Components**: Functional components with hooks only
- **TypeScript**: Strict interfaces for props, state, event handlers
- **Composition**: Component composition over inheritance
- **State**: `useState` for local, `useReducer` for complex, `useContext` for shared state
- **Effects**: Proper dependency arrays, cleanup functions, no infinite loops
- **Performance**: `React.memo`, `useMemo`, `useCallback` only when needed
- **Naming**: PascalCase for components, camelCase for functions/variables

## Code Examples

**Good Component:**
```typescript
interface UserCardProps {
  name: string
  email: string
  onDelete?: (id: string) => void
}

export function UserCard({ name, email, onDelete }: UserCardProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = useCallback(async () => {
    setIsDeleting(true)
    await onDelete?.(id)
  }, [id, onDelete])

  return (
    <div>
      <h2>{name}</h2>
      <p>{email}</p>
      {onDelete && <button onClick={handleDelete}>Delete</button>}
    </div>
  )
}
```

**Good Custom Hook:**
```typescript
function useUserData(userId: string) {
  const [data, setData] = useState<User | undefined>(undefined)
  const [error, setError] = useState<Error | undefined>(undefined)

  useEffect(() => {
    let cancelled = false

    fetchUser(userId)
      .then((user) => !cancelled && setData(user))
      .catch((err) => !cancelled && setError(err))

    return () => { cancelled = true }
  }, [userId])

  return { data, error, isLoading: !data && !error }
}
```

## Testing

- Use React Testing Library (test behavior, not implementation)
- Mock external dependencies appropriately
- Test accessibility and keyboard navigation

## Styling

- Use CSS Modules, Tailwind, or modern CSS-in-JS
- Semantic HTML with proper ARIA attributes
- Mobile-first responsive design

## Security & Accessibility

- Sanitize user inputs (XSS prevention)
- Semantic HTML elements
- Proper ARIA attributes and roles
- Keyboard navigation for interactive elements
- Alt text for images
