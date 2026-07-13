# Migration Plan

**Scope:** Post-audit redesign preparation  
**Current baseline:** Expo SDK 53 / React Native 0.79.2 / React 19.0.0

## Target stable platform

Target **Expo SDK 56** as the eventual stable platform baseline. Expo’s official SDK 56 release notes identify SDK 56 as released on May 21, 2026 and pair it with React Native 0.85 and React 19.2. The repository should not jump directly from SDK 53 to SDK 56.

Reference: [Expo SDK 56 release notes](https://expo.dev/changelog/sdk-56), [Expo SDK compatibility table](https://docs.expo.dev/versions/latest/).

## Safe upgrade sequence

Perform one SDK step at a time. At each step, commit the dependency/native changes separately, run the full baseline suite, and stop if the native build or core flows regress.

### Step 0: Stabilize current SDK 53

- Restore dependencies from `package-lock.json` with `npm ci`.
- Remove the proven redundant direct `expo-modules-core` dependency; Expo keeps it transitively.
- Add lint/test/typecheck/doctor/build scripts and CI.
- Verify Metro export, Android development build, navigation, dashboard, browse, workout creation, and reminder behavior.
- Record the exact Expo Doctor warnings before upgrading.

### Step 1: Patch-align SDK 53

Use Expo’s compatibility resolver rather than hand-editing every version:

```powershell
npx expo install expo@~53.0.27
npx expo install --fix
npx expo-doctor
npm run test
npm run lint
npm run typecheck
npm run android:dev
```

Review `package-lock.json` and native diffs. Confirm the expected React Native `0.79.6`, Reanimated `3.17.x`, Gesture Handler `2.24.x`, Screens `4.11.x`, and Expo package patch versions before moving on.

### Step 2: SDK 54

```powershell
npm install expo@^54.0.0
npx expo install --fix
npx expo-doctor
```

SDK 54 moves to React Native 0.81 and React 19.1. Review the SDK 54 release notes, regenerate or manually reconcile native changes, then rerun all baseline flows. Do not introduce SQLite or redesign work in the same change.

Reference: [Expo SDK 54 release notes](https://expo.dev/changelog/sdk-54).

### Step 3: SDK 55

```powershell
npm install expo@^55.0.0
npx expo install --fix
npx expo-doctor
```

SDK 55 moves to React Native 0.83 and React 19.2 and drops support for the Legacy Architecture. Validate Skia, Reanimated, Gesture Handler, WebView, DateTimePicker, and Picker on the New Architecture before continuing.

Reference: [Expo SDK 55 release notes](https://expo.dev/changelog/sdk-55).

### Step 4: SDK 56

```powershell
npm install expo@^56.0.0
npx expo install --fix
npx expo-doctor
```

SDK 56 moves to React Native 0.85 and React 19.2. Reconfirm all native modules, notification scheduling, edge-to-edge handling, and development build startup. This is the target stable platform for the redesign implementation phases.

## Dependency decisions

### Remove after Phase 0 evidence

The source scan proves these direct dependencies have no application import: `expo-modules-core`, `@react-navigation/native-stack`, `expo-linear-gradient`, `expo-status-bar`, `react-native-circular-progress`, `react-native-circular-progress-indicator`, and `react-native-picker-select`.

Only remove them one at a time, reinstall from the lockfile, rerun Metro export, and rerun Expo Doctor. Keep packages that are transitive native support or web/runtime requirements even if application source does not import them directly.

### Keep pending later decisions

- `@shopify/react-native-skia`: used by `CircularTimer`; currently prerelease and expensive to compile. Replace only after a functional timer alternative is selected and tested.
- `react-native-chart-kit`: used by `DailyChart` but not tested on New Architecture. Replace during analytics redesign after a comparison against `react-native-svg`/Reanimated or another maintained option.
- `react-native-webview`: used for remote ExerciseDB GIF/detail rendering; migrate to a safer native image/detail approach when the API/data layer is redesigned.
- `expo-updates`: keep because `app.json` configures EAS Updates and the native Android project autolinks it.
- React Navigation stack packages: keep current navigation architecture; do not replace with Expo Router.

## Data and persistence migration

Before introducing SQLite:

1. Define versioned TypeScript domain records for workouts, exercises, completed sessions, reminders, and daily summaries.
2. Read and validate `workout-storage` and `total-time-storage` once through a migration adapter.
3. Write migrated records into SQLite in a transaction with a migration version.
4. Keep a backup/export path and mark malformed records as recoverable migration errors rather than silently dropping them.
5. Make SQLite the source of truth; restrict Zustand to temporary UI state and active workout state.
6. Keep suggested exercises and demo data separate from confirmed user records.

## TypeScript migration

Migrate incrementally in this order:

1. Pure utility `components/TimerFormat.js` and `utils/cache.js`.
2. Domain types and store interfaces.
3. Navigation param lists.
4. Reusable components.
5. Screens and entry files.
6. Enable strict type checking after core entry files and navigation contracts are converted.

## Data/network/security migration

- Remove the RapidAPI key from client source; use a controlled backend/proxy or a public/local exercise catalog.
- Make cache schema/version and expiry explicit.
- Give every network screen loading, empty, error, and offline states.
- Keep user-created workouts distinct from suggestions and remote exercise records.
- Treat recovery estimates as non-medical, educational guidance only.

## Design-system migration

Read `docs/DESIGN_SYSTEM.md` before visual work. Implement the Kinetic Trace tokens and SVG primitives in a dedicated design-system phase. Do not restyle screens during Phase 0 or package upgrades.

## Native/development-build migration

- Establish Android development builds with `npx expo run:android` and EAS development profile support.
- Because `android/` is checked in and `ios/` is absent, treat native changes as explicit files that require review; do not delete native folders casually.
- On each SDK step, inspect prebuild/config drift, notification configuration, edge-to-edge behavior, and native module autolinking.
- Add iOS validation when an Apple development environment is available.

## Upgrade exit criteria

Do not continue to the next SDK when any of the following fail:

- Clean install from lockfile
- Metro Android export
- Expo Doctor with only explicitly accepted warnings
- Android development build install/launch
- Dashboard, browse, exercise detail, workout creation, profile, and reminder smoke flows
- Persistence round-trip for existing records
- CI lint, tests, and typecheck placeholder
