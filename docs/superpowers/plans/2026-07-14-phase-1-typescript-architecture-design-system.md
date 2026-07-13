# Phase 1 TypeScript Architecture and Design System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the JavaScript prototype shell with a strict TypeScript architecture, Kinetic Trace design system, typed navigation shell, and development gallery while keeping feature behavior out of scope.

**Architecture:** `App.tsx` and `src/app` own root composition; `src/navigation` owns typed React Navigation routes and the custom tab shell; `src/design-system` owns every new visual value, reusable component, SVG motif, and Reanimated hook. Feature folders contain only typed placeholder screens needed by navigation and gallery.

**Tech Stack:** Expo SDK 53, React Native 0.79, React Navigation 7, TypeScript, `react-native-svg`, `react-native-reanimated`, `react-native-safe-area-context`, and Node’s built-in test runner.

## Global Constraints

- Use TypeScript for all new files and enable strict checking for the migrated entry/navigation/design-system code.
- Keep React Navigation; do not introduce Expo Router.
- Do not add feature-specific business logic, persisted demo data, SQLite, or AsyncStorage migrations in Phase 1.
- `docs/DESIGN_SYSTEM.md` is authoritative; use Kinetic Trace colors and SVG motifs selectively.
- No white page canvas; dense interfaces use solid dark surfaces.
- Lime is reserved for action, selection, and progress; cyan, amber, and coral represent secondary states.
- Every interactive target is at least 48 x 48 logical pixels and has an accessibility label.
- New motion uses Reanimated and must honor reduced motion.
- Run typecheck, lint, tests, Expo Doctor, Android bundle/export, and Android development-build smoke validation before completion; report environment limitations honestly.

---

### Task 1: TypeScript foundation and strict entry point

**Files:**
- Create: `tsconfig.json`
- Create: `src/app/App.tsx`
- Create: `src/app/AppErrorBoundary.tsx`
- Create: `src/types/navigation.ts`
- Modify: `index.js` to register `src/app/App`
- Modify: `package.json` scripts/devDependencies only when required for strict typechecking
- Test: `tests/architecture.test.mjs`

**Interfaces:**
- `AppErrorBoundary` accepts `{ children: React.ReactNode }` and renders a tokenized error fallback.
- `RootStackParamList` and `MainTabParamList` are exported for all navigators.

- [ ] Write a failing architecture test that asserts the new app and navigation type files exist and that the typecheck command is no longer the placeholder.
- [ ] Run `npm test -- tests/architecture.test.mjs` and confirm it fails because the files/configuration are absent.
- [ ] Add strict `tsconfig.json`, typed root app, error boundary, and entry registration.
- [ ] Run the focused test and `npx tsc --noEmit`; fix only type errors caused by the new entry graph.

### Task 2: Token layer and motion foundation

**Files:**
- Create: `src/design-system/tokens/colors.ts`, `typography.ts`, `spacing.ts`, `radii.ts`, `shadows.ts`, `motion.ts`, `index.ts`
- Create: `src/design-system/motion/usePressScale.ts`, `useEntranceAnimation.ts`, `useAnimatedNumber.ts`, `useReducedMotionPreference.ts`, `useHapticAction.ts`, `useScrollHeader.ts`, `useBottomSheetMotion.ts`, `index.ts`
- Create: `tests/design-system-tokens.test.mjs`

**Interfaces:**
- Export `colors`, `typography`, `spacing`, `radii`, `shadows`, `motion`, and `springs` from `src/design-system/tokens`.
- Export hooks with typed options and stable reduced-motion fallbacks from `src/design-system/motion`.

- [ ] Write failing token tests for dark canvas, lime action color, 48 minimum target constant, and reduced-motion duration.
- [ ] Run the focused tests and confirm the exports are absent.
- [ ] Implement token modules and hooks using Reanimated shared values/worklets only.
- [ ] Run the focused tests and strict typecheck; confirm token tests pass.

### Task 3: Typed reusable design components

**Files:**
- Create typed components under `src/design-system/components/` for every requested component: `AppScreen`, `AppScrollView`, `Surface`, `GlassSurface`, `KineticCard`, `PrimaryButton`, `SecondaryButton`, `TextButton`, `IconButton`, `FloatingActionOrb`, `Chip`, `SegmentedControl`, `MetricValue`, `ProgressBar`, `ProgressArc`, `SectionHeader`, `EmptyState`, `ErrorState`, `Skeleton`, `Toast`, `BottomSheet`, `ConfirmationSheet`, `FormField`, `NumericField`, `KineticCardFrame`, and `HeatCell`.
- Create `src/design-system/svg/SignalTrace.tsx` and `CornerBrackets.tsx`.
- Create `src/design-system/index.ts`.
- Create `tests/design-system-components.test.mjs`.

**Interfaces:**
- Components accept tokenized style overrides only where necessary and expose `accessibilityLabel` for controls.
- `BottomSheet` accepts `visible`, `title`, `onClose`, and `children`.
- `ProgressArc` accepts `progress` in `[0,1]`; `HeatCell` accepts `level` in `[0,4]`.

- [ ] Write failing pure contract tests for progress clamping, minimum hit slop, and required component exports.
- [ ] Run them and confirm failure before implementation.
- [ ] Implement the components with dark surfaces, typed props, native primitives, `react-native-svg`, Reanimated, and 48×48 targets.
- [ ] Run the focused tests, strict typecheck, and lint on `src/design-system`.

### Task 4: Typed navigation shell and placeholder screens

**Files:**
- Create: `src/navigation/MainTabNavigator.tsx`, `QuickActionSheet.tsx`, `ProfileStack.tsx`, `index.ts`
- Create: `src/features/today/TodayScreen.tsx`, `training/TrainingScreen.tsx`, `nutrition/NutritionScreen.tsx`, `progress/ProgressScreen.tsx`, `profile/ProfileScreen.tsx`
- Create: `src/features/onboarding/OnboardingScreen.tsx`, `src/features/exercises/ExercisesScreen.tsx`, `src/features/hydration/HydrationScreen.tsx`, `src/features/recovery/RecoveryScreen.tsx`
- Create: `tests/navigation.test.mjs`
- Modify: `src/app/App.tsx`
- Modify: `app.json` dark UI/splash/icon background configuration

**Interfaces:**
- Main tabs are exactly `Today`, `Train`, `Nutrition`, and `Progress`.
- Quick-action labels are exactly: `Start workout`, `Log food`, `Add water`, `Check in`, `Log bodyweight`, and `Ask coach`.
- Profile is reached through a top-right avatar and is not a bottom tab.

- [ ] Write failing route contract tests for exact tab and quick-action labels.
- [ ] Run them and confirm no new route contract exists.
- [ ] Implement the typed shell, avatar route, orb sheet, and placeholder screen states without persistence.
- [ ] Run focused navigation tests, typecheck, lint, and an Android Expo export.

### Task 5: Development gallery and documentation alignment

**Files:**
- Create: `src/features/design-gallery/DesignGalleryScreen.tsx`
- Create: `tests/design-gallery.test.mjs`
- Modify: `src/navigation/MainTabNavigator.tsx` or root route guard to expose gallery only under `__DEV__`
- Update: `docs/ARCHITECTURE.md`, `docs/DESIGN_SYSTEM.md`, `docs/IMPLEMENTATION_STATUS.md`, `docs/TESTING.md`, `docs/DATA_MODEL.md`, and `CHANGELOG.md`

**Interfaces:**
- `DesignGalleryScreen` renders all requested component categories, button states, empty/error/loading states, bottom sheet, SVG motifs, and reduced-motion preview.

- [ ] Write failing gallery contract tests for component section labels and development-only route guard.
- [ ] Run them and confirm the gallery is absent.
- [ ] Implement the gallery with no feature records and update all required project documents.
- [ ] Run focused tests, lint, strict typecheck, Expo Doctor, Android export, and the development build/smoke test when available.

### Task 6: Legacy cleanup and final verification

**Files:**
- Remove only unreferenced prototype files under `screens/`, `navigation/`, `components/`, and `utils/` after reference scans.
- Modify: `index.js`, `package.json`, and any lint/test configuration needed to reflect the typed source tree.

- [ ] Run `rg` import/reference scans before deletion and record any retained files.
- [ ] Remove unreferenced legacy files and update scripts/configuration without deleting assets still used by the gallery or app config.
- [ ] Run the complete verification suite and inspect `git diff --check`.
- [ ] Report files added/modified/removed, dependencies, migrations, tests, commands, limitations, manual checklist, and suggested commit message; stop after Phase 1.
