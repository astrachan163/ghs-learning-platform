# Backend

This is the backend service for the GHS Learning Platform.

## Testing Layout

Tests are located under `src/tests/` to satisfy TypeScript `rootDir` constraints defined in `tsconfig.json`. The `rootDir` is set to `"src"`, which means all TypeScript files must reside within the `src` directory for proper compilation.

Test organization:
- `src/tests/security/` - Security-related tests including injection resistance tests
- Additional test directories can be added under `src/tests/` as needed

This structure ensures that:
1. TypeScript compilation works without `rootDir` violations
2. Tests are co-located with the source code they test
3. The build process remains clean and predictable