# Architecture Baseline

## Current Phase 0 architecture

- `index.js` registers `App.js` through Expo.
- `App.js` owns the root safe area, status bar, and `NavigationContainer`.
- React Navigation 7 uses a bottom-tab navigator with nested legacy stack navigators for Browse and Workout Session.
- Screens and reusable components are JavaScript modules.
- Zustand stores temporary/session state and currently persist workout and total-time records through AsyncStorage.
- Exercise browsing and detail data come from RapidAPI ExerciseDB with AsyncStorage caching.
- Notifications are configured through `expo-notifications` and invoked from the reminder component.
- Android native files are checked in; no iOS native directory is present.

## Deferred architecture changes

SQLite will become the source of truth after the database phase. TypeScript migration, domain boundaries, API key handling, and design-system extraction are deferred to later phases. React Navigation remains the routing system.

This document is a Phase 0 map, not permission to implement later-phase changes.
