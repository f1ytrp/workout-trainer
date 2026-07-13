# Kinetic Trace Design System

Status: Phase 1 visual contract  
Scope: The complete Workout Trainer redesign

This document is the visual contract for the redesign. All future visual work must follow it. It exists to prevent the application from becoming another generic black-and-green AI design.

## Visual identity: “Kinetic Trace”

The interface should look like a precision training instrument, not a gaming terminal.

The distinctive visual language consists of:

- Smoked graphite surfaces
- Soft mineral textures
- Acid lime used only for action and confirmed progress
- Thin “kinetic trace” lines derived from movement and progress data
- Selective cut corners
- Layered depth without excessive glass
- Large readable data values
- Small technical details around the edges rather than across every screen
- Asymmetric compositions on hero cards
- Rounded controls for touch-heavy interactions
- Angular SVG accents for analytical interfaces

## Colour tokens

```ts
export const colors = {
  canvas: '#07090B',
  canvasElevated: '#0B0F12',
  surface: '#101519',
  surfaceRaised: '#151C20',
  surfacePressed: '#1A2226',

  glass: 'rgba(17, 23, 27, 0.72)',
  glassStrong: 'rgba(20, 27, 31, 0.86)',

  textPrimary: '#F3F6F2',
  textSecondary: '#A4ADA6',
  textMuted: '#69736D',

  borderSubtle: 'rgba(239, 247, 241, 0.08)',
  borderStrong: 'rgba(239, 247, 241, 0.16)',

  accent: '#B7FF32',
  accentSoft: '#8FCC2B',
  accentTint: 'rgba(183, 255, 50, 0.12)',

  information: '#72D7E8',
  warning: '#F0B35A',
  destructive: '#F07068',
  success: '#65D68A',
};
```

Use the colour distribution approximately as follows:

- 70% graphite and dark neutral surfaces
- 20% white, grey, and subtle borders
- 7% lime
- 3% contextual cyan, amber, coral, or green

Lime should not appear on every label, border, and icon.

## Typography

- Display headings: Space Grotesk or a comparable geometric font
- Main interface: Inter or system sans serif
- Numerical data: tabular numerals
- Technical metadata: optionally JetBrains Mono in small quantities
- Avoid condensed uppercase type for paragraphs and controls

## Surface rules

Use three surface categories:

1. Solid functional surfaces
   Workout sets, food entries, forms, calendar details, and settings.

2. Translucent elevated surfaces
   Bottom navigation, modal sheets, and compact overlays.

3. Signature framed surfaces
   Dashboard hero, muscle heatmap, and major report cards.

Do not stack multiple blurred surfaces over one another.

## Original SVG signature paths

Create `src/design-system/svg/kineticPaths.ts` during the design-system implementation phase.

```ts
export const kineticPaths = {
  // viewBox: 0 0 360 180
  cardFrame:
    'M24 1H306L359 54V156C359 169 349 179 336 179H54L38 163H24C11 163 1 153 1 140V24C1 11 11 1 24 1Z',

  // viewBox: 0 0 320 32
  signalTrace:
    'M2 23H40L54 8H92L104 18H156L168 4H214L226 20H272L284 10H318',

  // viewBox: 0 0 32 32
  heatCell:
    'M8 1H24L31 8V24L24 31H8L1 24V8Z',

  // viewBox: 0 0 320 32
  leftBracket:
    'M4 28V10C4 6.7 6.7 4 10 4H56',

  // viewBox: 0 0 320 32
  rightBracket:
    'M264 4H310C313.3 4 316 6.7 316 10V28',

  // viewBox: 0 0 200 24
  metricRail:
    'M2 16H46L56 6H92L102 16H142L150 10H198',
};
```

## Reusable visual components

Build these reusable components:

- `KineticCardFrame`
- `SignalTrace`
- `CornerBrackets`
- `HeatCell`
- `MetricRail`
- `ProgressArc`
- `BodyMap`
- `MuscleRegion`

Use these motifs only on hero cards, analytics, and selected states. Do not place the same trace on every card.

- SVG strokes should normally use 8–20% opacity.
- Lime SVG strokes are reserved for active or completed states.
- Keep the actual content readable without the decoration.

## Muscle-map SVG architecture

Create original front and rear body SVGs with `viewBox="0 0 240 520"`.

Every region must be a separate `Path`, not a flattened image, and must have one of these stable IDs:

### Front

```text
front_chest_left
front_chest_right
front_deltoid_left
front_deltoid_right
front_biceps_left
front_biceps_right
front_forearm_left
front_forearm_right
front_abs
front_oblique_left
front_oblique_right
front_quadriceps_left
front_quadriceps_right
front_adductor_left
front_adductor_right
front_tibialis_left
front_tibialis_right
```

### Back

```text
back_traps
back_rear_deltoid_left
back_rear_deltoid_right
back_triceps_left
back_triceps_right
back_lats_left
back_lats_right
back_lower_back
back_glutes_left
back_glutes_right
back_hamstrings_left
back_hamstrings_right
back_calves_left
back_calves_right
```

Use Stitch vectors when they are usable, but simplify and redraw unclear paths rather than copying an inaccurate mannequin.

## Motion tokens

```ts
export const motion = {
  duration: {
    instant: 90,
    fast: 140,
    base: 220,
    slow: 340,
    hero: 460,
  },

  spring: {
    press: {
      damping: 20,
      stiffness: 280,
      mass: 0.75,
    },
    snappy: {
      damping: 21,
      stiffness: 250,
      mass: 0.85,
    },
    gentle: {
      damping: 18,
      stiffness: 175,
      mass: 0.95,
    },
    sheet: {
      damping: 24,
      stiffness: 235,
      mass: 1,
    },
  },
};
```

## Motion behaviour

| Interaction | Animation |
| --- | --- |
| Button press | Scale to `0.96`, then spring to `1` |
| Icon press | Scale to `0.9`, rotate at most 4 degrees |
| Card entrance | Fade with `translateY: 10 → 0`; stagger no more than 35 ms |
| Bottom sheet | Spring from bottom with backdrop fade |
| Tab change | Indicator slides; content crossfades in 180–220 ms |
| Completed set | Background colour interpolation, check scale, and haptic |
| Reordered exercise | Reanimated layout transition |
| Rest timer | SVG dash offset driven by elapsed timestamps |
| Muscle selection | Colour interpolation and maximum scale of `1.015` |
| Calendar range change | Layout transition rather than full page reload |
| Number update | Short vertical digit roll |
| Personal record | One restrained trace sweep; no confetti storm |
| Error | Brief horizontal movement of 4–6 px, never aggressive shaking |

Use `withTiming` for opacity and colour. Use `withSpring` for physical movement. Use shared values for gesture-driven interactions. Support the system’s reduced-motion setting for every animation. Reanimated provides dedicated reduced-motion handling for this purpose.

## Implementation guardrails

- This document defines the visual direction; it does not authorize implementing later redesign phases early.
- Rebuild the system with React Native primitives, `react-native-svg`, and Reanimated rather than copying web HTML, CSS, or fixed-size Stitch layouts.
- Preserve readability, touch targets, accessibility, loading/empty/error states, offline behaviour, and tests for every feature using this system.
