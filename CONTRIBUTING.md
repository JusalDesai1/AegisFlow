# Contributing to AegisFlow

## Code of Conduct

Be respectful, inclusive, and focused on the mission: saving lives during disasters.

## How to Contribute

### 1. Fork & Branch
```bash
git checkout -b feature/your-feature-name
```

### 2. Follow Code Style
- Use TypeScript (no `any` types)
- Follow ESLint rules
- Format with Prettier
- Use semantic commit messages

### 3. Accessibility First
- Test with keyboard navigation
- Verify color contrast (4.5:1)
- Add ARIA labels to interactive elements
- Test with screen reader

### 4. Testing
- Write tests for new features
- Update snapshots if needed
- Ensure 80%+ coverage

### 5. Documentation
- Update README if needed
- Add JSDoc comments
- Document new components

### 6. Submit PR
- Link related issues
- Describe changes clearly
- Request review from maintainers

## Development Workflow

```bash
# Setup
npm install
cp .env.example .env.local

# Create branch
git checkout -b fix/issue-123

# Make changes & test
npm run lint:fix
npm run test

# Commit
git commit -m "fix: resolve incident modal crash on mobile"

# Push & PR
git push origin fix/issue-123
```

## Component Guidelines

### Anatomy
```typescript
import React from 'react';
import clsx from 'clsx';

interface ComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'primary';
  size?: 'sm' | 'md' | 'lg';
}

const Component = React.forwardRef<HTMLDivElement, ComponentProps>((
  { className, variant = 'default', size = 'md', ...props },
  ref
) => {
  return (
    <div
      ref={ref}
      className={clsx(
        'base-styles',
        variantMap[variant],
        sizeMap[size],
        className
      )}
      {...props}
    />
  );
});

Component.displayName = 'Component';
export default Component;
```

### WCAG Checklist
- ✅ Semantic HTML (`<button>`, `<nav>`, `<main>`)
- ✅ ARIA labels on icon-only buttons
- ✅ Color contrast 4.5:1+
- ✅ Focus indicators visible
- ✅ Keyboard navigation support
- ✅ Error messages linked to inputs
- ✅ Live regions for dynamic content

## Performance Guidelines

- Use `React.memo` for expensive components
- Debounce search/filter inputs
- Lazy load heavy components (maps, 3D globe)
- Optimize images (next/image)
- Tree-shake unused dependencies

## Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style
- `refactor`: Code refactoring
- `perf`: Performance improvement
- `test`: Adding tests
- `chore`: Build/dependencies

**Example**:
```
feat(dispatch): add unit conflict detection

When two units are dispatched to same incident,
system now alerts operator and suggests alternatives.

Closes #342
```

## Questions?

Open an issue or reach out to maintainers.

Thanks for helping make emergency response better! 🚨
