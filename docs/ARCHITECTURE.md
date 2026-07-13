# Workout Trainer Architecture

## Phase 1 production shell

`index.js` registers `src/app/App.tsx`. The root app loads the approved local fonts, sets the dark system canvas, wraps the app in `SafeAreaProvider` and a typed error boundary, and mounts a themed React Navigation container.

The source tree is feature-oriented:

```text
src/
  app/              root providers and error boundary
  assets/           future feature-local asset adapters
  components/       cross-feature composition points
  design-system/    tokens, reusable components, motion, and SVG motifs
  features/         phase-owned screens and later feature boundaries
  navigation/       typed root/tab navigation and quick actions
  database/         reserved for the SQLite phase
  repositories/     reserved for local data access
  services/         reserved for external integrations
  stores/           reserved for temporary UI/active-workout state
  hooks/            cross-feature hooks
  types/            shared route and domain types
  utils/            pure utilities
```

Phase 1 has four bottom tabs: Today, Train, Nutrition, and Progress. A central orb opens six placeholder quick actions. Profile is a root stack screen opened from the top-right avatar. The development-only DesignGallery route is guarded by `__DEV__` and is not part of the production route surface.

## Boundaries

- `design-system` owns all new visual values and never imports feature business logic.
- `navigation` owns route contracts and does not persist records.
- `features` owns screen composition and placeholder copy only in this phase.
- `database`, `repositories`, `services`, `stores`, `hooks`, and `utils` are reserved extension points; no database or confirmed user data is created here.
- React Navigation remains in place; no Expo Router migration is planned.

## Later phases

The database phase will add explicit AsyncStorage-to-SQLite migrations and make SQLite the source of truth. Zustand will be limited to temporary UI state and active workout state. Feature phases will add loading, empty, error, offline, accessibility, reduced-motion, and relevant tests around real data flows.
