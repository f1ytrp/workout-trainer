# Workout Trainer Repository Instructions

These instructions apply to all work performed in the `workout-trainer` repository. Read and follow them before inspecting, changing, testing, or reviewing the application.

## Project context

This repository is a React Native and Expo fitness application. The current codebase uses JavaScript, React Navigation, Zustand, AsyncStorage, and local assets. Inspect the actual repository files before making assumptions.

## Project rules

1. Work phase by phase.
   Do not implement later-phase features early. Stop after completing the requested phase and provide a report.

2. Do not perform a blind full rewrite.
   Reuse working code where it is clean, but replace prototype architecture when necessary. Preserve existing user data through explicit migrations.

3. Use TypeScript for all new files.
   Migrate old JavaScript incrementally. Enable strict type checking once the core entry files are converted.

4. Keep React Navigation unless there is a proven architectural reason to replace it.
   Do not introduce a routing migration merely because another routing option exists.

5. Keep the application local-first.
   After the database phase, SQLite is the source of truth. Zustand should manage temporary UI state and the active workout, not serve as the permanent database.

6. Treat Stitch-generated code as visual reference.
   Do not paste web HTML, CSS, or fixed-size layouts directly into React Native. Extract tokens, proportions, SVG concepts, and useful components, then rebuild them using React Native primitives, `react-native-svg`, and Reanimated.

7. Avoid unnecessary dependencies.
   Before installing a package, explain why existing dependencies or platform APIs cannot solve the requirement.

8. Every feature must include:
   - Loading state
   - Empty state
   - Error state
   - Offline behaviour
   - Accessibility labels
   - Reduced-motion behaviour
   - Relevant tests

9. Every interactive control must have a minimum 48 x 48 logical-pixel target.

10. Do not use a white page background.
    The entire app uses a cohesive dark visual system. Dense workout interfaces should use solid dark surfaces, not excessive glass.

11. Never use fake persisted data in production screens.
    Seeded demo data is allowed only in development mode and must be clearly isolated.

12. Do not silently invent fitness, workout, or nutrition records.
    Suggestions must remain separate from confirmed user data.

13. Do not present recovery estimates as medical facts.
    Do not diagnose injuries or prescribe treatment.

14. Run these checks before completing a phase:
    - Type checking
    - Linting
    - Unit tests
    - Relevant component tests
    - Expo Doctor
    - Android development build or emulator smoke test

15. After every phase, provide:
    - Files added
    - Files modified
    - Database migrations
    - Dependencies changed
    - Tests added
    - Commands run
    - Known limitations
    - Manual testing checklist
    - Suggested commit message

16. Maintain these documents:
    - `docs/ARCHITECTURE.md`
    - `docs/DESIGN_SYSTEM.md`
    - `docs/DATA_MODEL.md`
    - `docs/IMPLEMENTATION_STATUS.md`
    - `docs/TESTING.md`
    - `CHANGELOG.md`

17. Treat `docs/DESIGN_SYSTEM.md` as the authoritative visual contract.
    Read it before any redesign or visual implementation. Follow its Kinetic Trace identity, colour usage, typography, surfaces, SVG architecture, reusable component requirements, and reduced-motion rules throughout the app. Do not replace it with generic black-and-green styling or introduce visual motifs that conflict with it without explicitly updating the document first.

Do not begin the next phase. Stop when the requested phase and its acceptance criteria are complete.
