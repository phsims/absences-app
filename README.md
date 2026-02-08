# Absences App

A React-based web application for managing and viewing employee absence records with conflict detection capabilities.

**Live App:** https://absences-app.vercel.app/

## Overview

The Absences App displays a sortable table of employee absences, allowing users to view detailed information and detect scheduling conflicts. The application fetches absence data from an API, displays it in an interactive table, and provides modal-based conflict checking for selected absences.

### Key Features

- **Sortable Absence Table**: View all employee absences with sorting by employee name, start date, end date, and absence type
- **Absence Details**: Click on any absence to view more details and see all absences for that employee
- **Conflict Detection**: Automatically detect scheduling conflicts when an absence is selected
- **Responsive Design**: Built with Material-UI for a modern, responsive interface
- **Type Safety**: Full TypeScript support for type-safe development

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

## Running the Application

### Development Server

Start the development server with hot module reloading:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Production Build

Build the application for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Testing

### Run Tests

Execute all tests:

```bash
npm test
```

### Run Tests in UI Mode

View test results in an interactive UI:

```bash
npm run test:ui
```

### Test Coverage

Generate and view test coverage reports:

```bash
npm run test:coverage
```

## Code Quality

### Linting

Check for linting errors and code style issues:

```bash
npm run lint
```

## Project Structure

```
src/
├── components/       # Reusable React components
│   └── Table/       # Sortable table component
├── hooks/           # Custom React hooks for data fetching
│   ├── useAbsences  # Fetch and manage absence data
│   └── useConflict  # Fetch and manage conflict data
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
├── App.tsx          # Main application component
└── main.tsx         # Application entry point
```

## Technology Stack

- **React 19**: UI framework
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and development server
- **Material-UI (MUI)**: Component library
- **Vitest**: Unit testing framework
- **Testing Library**: React component testing utilities
- **ESLint**: Code linting

## Incomplete Functionality & Future Improvements

### 1. **Absence Types as Enums**
Currently, absence types are stored as strings (e.g., "SICKNESS", "ANNUAL_LEAVE"). 

**Approach:**
- Define a TypeScript enum for absence types in [src/types/Absences.ts](src/types/Absences.ts) 
- Update the API data parsing to validate against this enum
- Replace the string-based `getAbsenceTypeLabel()` function with enum mapping
- **Note:** This approach only works if absence types from the backend are fixed/known values

### 2. **Dynamic Table Headers**
Table headers are currently hardcoded in [src/App.tsx](src/App.tsx#L22-L27) with a comment noting they could be dynamic.

**Approach:**
- Move headers to a configuration file or constants

### 3. **Error Handling UI**
The app currently displays errors but lacks detailed error recovery options.

**Approach:**
- Create a dedicated Error component with retry buttons
- Add user-friendly error messages for different failure scenarios
- Display partial data when certain API calls fail (graceful degradation)

### 4. **Conflict Details**
Currently, the modal only shows a binary "Conflict found" / "No conflicts" message.

**Approach:**
- **Backend dependency:** The conflict API currently only accepts a single item by ID. Extend the backend to accept a date range instead
- Add pagination support to the absence API to handle large datasets efficiently
- Once the backend is updated, extend the Conflict type to include specific conflict details (overlapping dates, other employees involved, etc.)
- Display detailed conflict information in the modal (which absences conflict, date ranges, etc.)
- Add filtering/highlighting in the table to show conflicting rows

### 5. **Performance Optimization**
For large datasets, the app may encounter performance issues.

**Approach:**
- Add pagination for absences data
- Memoize expensive computations more strategically
- Consider implementing data caching with a strategy like SWR, React Query or apollo and graphQL

### 6. **Accessibility Improvements**
While basic ARIA labels exist, accessibility could be enhanced.

**Approach:**
- Add keyboard navigation for table sorting and row selection
- Improve screen reader support for the modal and data presentation
- Add focus management when modals open/close
- Test with accessibility tools and follow WCAG 2.1 guidelines

### 7. **Test Coverage**
While some tests exist, more are needed for fuller coverage.

## Development Guidelines
- Tests are located alongside components and hooks with `.test.ts(x)` suffix
- Utility functions should be tested in `utils.test.ts`
- Hooks should handle their own loading and error states
- Data transformation is done in components, keeping hooks focused on data fetching

## Pre-commit Hooks

**Note:** This is a tech test project, so pre-commit hooks are not currently configured. However, in a production application, I would implement pre-commit hooks to automatically run tests and linting before commits. This ensures code quality and test coverage are maintained throughout development.

The pre-commit hooks would:
- Run the test suite to catch any breaking changes
- Run ESLint to enforce code style and best practices

If either tests fail or linting issues are found, the commit would be blocked, allowing developers to fix the issues before committing.

To set up pre-commit hooks in a production app, install [Husky](https://typicode.github.io/husky/) and configure your `.husky/pre-commit` hook to run:
```bash
npm test && npm run lint
```

This approach ensures that only code that passes tests and linting standards makes it into the repository.
