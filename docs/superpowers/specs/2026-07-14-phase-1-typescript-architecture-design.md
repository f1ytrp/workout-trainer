# Phase 1 TypeScript Architecture and Design System

## Goal

Replace the JavaScript prototype shell with a typed, feature-oriented Expo architecture and establish the Kinetic Trace visual foundation without implementing fitness, nutrition, hydration, recovery, profile, or persistence behavior.

## Decisions

- React Navigation remains the routing foundation.
- The new production surface is a typed bottom-tab shell with Today, Train, Nutrition, and Progress tabs plus a central quick-action orb. Profile is opened by a top-right avatar.
- Legacy `screens/`, `navigation/`, and prototype `components/` files are removed only after a reference scan confirms the new app no longer imports them. No legacy behavior is preserved for Phase 1.
- New files use TypeScript with strict checking. Existing JavaScript is not migrated unless it is directly required by the new entry point.
- New design code imports visual values only from design-system tokens.
- New motion uses Reanimated. Reduced-motion mode returns static styles/values and disables haptics where appropriate.
- Feature placeholders communicate that later-phase functionality is not yet available; they do not create or persist demo records.

## Architecture

The `src/` tree is organized by responsibility: `app` owns the root provider composition, `navigation` owns route types and navigators, `design-system` owns tokens/primitives/motion/SVG motifs, and `features` owns phase-safe placeholder screens. `services`, `repositories`, `database`, `stores`, `hooks`, `types`, and `utils` are present as typed extension points but remain free of product persistence in this phase.

`App.tsx` provides the dark root canvas, status-bar treatment, `NavigationContainer`, and a typed `AppErrorBoundary`. `MainTabNavigator` owns the tab route contract and custom tab bar. `ProfileScreen` and `QuickActionSheet` are shared shell routes. `DesignGalleryScreen` is guarded by `__DEV__` and demonstrates the complete design-system surface.

## Design system

`src/design-system/tokens` contains colours, typography, font sizes/weights, spacing, radii, shadows, blur, z-index, durations, and spring configs. The visual contract uses near-black/navy solid surfaces, lime for action/selection/progress only, cyan/amber/coral for meaningful secondary states, and selective glass surfaces. SVG trace motifs are used as framing accents rather than as decoration on every surface.

All interactive controls expose accessibility labels and use at least a 48 logical-pixel target. Dense screens use solid surfaces. Buttons expose disabled/loading states. Empty, error, loading, offline, and reduced-motion states are represented in the gallery and placeholder screens.

## Component contracts

The shared components are typed, composable primitives: layout (`AppScreen`, `AppScrollView`, `Surface`, `GlassSurface`), cards (`KineticCard`, `KineticCardFrame`), actions (`PrimaryButton`, `SecondaryButton`, `TextButton`, `IconButton`, `FloatingActionOrb`), data display (`Chip`, `SegmentedControl`, `MetricValue`, `ProgressBar`, `ProgressArc`, `SectionHeader`, `HeatCell`), state (`EmptyState`, `ErrorState`, `Skeleton`, `Toast`), sheets/forms (`BottomSheet`, `ConfirmationSheet`, `FormField`, `NumericField`), and SVG motifs (`SignalTrace`, `CornerBrackets`).

## Motion and accessibility

Motion hooks centralize press scale, entrance transitions, animated numbers, reduced-motion preference, haptic actions, scroll-header behavior, and bottom-sheet movement. The reduced-motion hook uses the system accessibility setting where available and supports a gallery preview override. All new motion falls back to immediate/static output; no new component mixes React Native Animated and Reanimated.

## Navigation and data flow

The tab bar renders four tabs and reserves the middle slot for the quick-action orb. Orb actions open placeholder feedback in a bottom sheet; they do not mutate stores or repositories. Profile is a route outside the tabs and is reached from the avatar. Feature placeholders consume only route labels and design primitives. No SQLite/database migration or confirmed user record is introduced.

## Testing and verification

Unit tests cover token invariants and route definitions. Component tests cover button states, empty/error/loading states, minimum target styles, sheet visibility, reduced-motion rendering, and SVG render contracts using the project’s Node test runner with lightweight pure helpers where React Native rendering is unavailable. Verification includes typecheck, lint, unit/component tests, Expo Doctor, Android export/development build smoke testing, and a manual DesignGallery checklist.

## Out of scope

Feature-specific data models, SQLite, AsyncStorage migration, workout logging, exercise browsing, nutrition/hydration/recovery records, remote APIs, coach behavior, medical recovery claims, and later-phase screen implementation.
