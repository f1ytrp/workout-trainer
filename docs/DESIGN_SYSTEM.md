# Kinetic Trace Design System

Status: Phase 1 implemented visual foundation
Scope: The Workout Trainer redesign contract

Kinetic Trace is a precision training instrument: smoked graphite surfaces, readable data, selective trace lines, asymmetric framed cards, and touch-first controls. It should feel calm and physical rather than like a generic black-and-neon terminal.

## Token source

All new TypeScript UI code imports visual values from `src/design-system/tokens`:

- `colors.ts`: canvas, solid surfaces, borders, ink, muted text, lime action/progress, cyan information, amber warning, and coral state colors.
- `typography.ts`: Montserrat display styles, DMSans interface styles, sizes, and weights.
- `spacing.ts`: rhythm plus `minimumTouchTarget: 48`.
- `radii.ts`, `shadows.ts`: surface geometry and depth.
- `motion.ts`: durations, reduced duration, and Reanimated spring configs.

Lime is reserved for action, selection, and confirmed progress. Cyan, amber, and coral indicate meaningful secondary states. The app canvas and native splash are dark; no new screen uses a white canvas.

## Surfaces

1. Solid functional surfaces: forms, dense lists, settings, and workout data.
2. Selective glass surfaces: compact overlays and emphasis cards, using a dark translucent fill without stacking blur layers.
3. Signature framed surfaces: hero cards and analytical moments with `KineticCardFrame`, `CornerBrackets`, or a restrained `SignalTrace`.

The motifs are selective. Content remains readable if SVG decoration is hidden.

## Components

The typed component barrel exports `AppScreen`, `AppScrollView`, `Surface`, `GlassSurface`, `KineticCard`, `PrimaryButton`, `SecondaryButton`, `TextButton`, `IconButton`, `FloatingActionOrb`, `Chip`, `SegmentedControl`, `MetricValue`, `ProgressBar`, `ProgressArc`, `SectionHeader`, `EmptyState`, `ErrorState`, `Skeleton`, `Toast`, `BottomSheet`, `ConfirmationSheet`, `FormField`, `NumericField`, `KineticCardFrame`, and `HeatCell`.

Every interactive control has an accessibility label and a 48×48 logical-pixel minimum target. Buttons expose loading and disabled states. Dense surfaces stay solid. Empty, error, loading, and offline copy is explicit rather than implied by a blank screen.

## SVG architecture

`SignalTrace` and `CornerBrackets` use `react-native-svg` paths with tokenized colors. Signature strokes are thin and contextual. Future body-map paths must keep regions as separate stable paths with semantic IDs; Phase 1 does not implement body maps.

## Motion

New motion uses Reanimated only. `usePressScale`, `useEntranceAnimation`, `useAnimatedNumber`, `useReducedMotionPreference`, `useHapticAction`, `useScrollHeader`, and `useBottomSheetMotion` centralize interaction behavior. When the system requests reduced motion, animations become immediate/static and haptic feedback is skipped where the hook is disabled.

Use springs for physical movement, timing for opacity and progress, and short transitions for feedback. Avoid decorative motion on every surface.

## Gallery

`src/features/design-gallery/DesignGalleryScreen.tsx` is development-only and demonstrates button states, surfaces, typography, progress, SVG motifs, empty/error states, forms, bottom sheets, toast/skeleton loading, and reduced-motion status. It contains no persisted records or feature logic.
