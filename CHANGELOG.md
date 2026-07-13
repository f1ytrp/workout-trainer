# Changelog

## Unreleased

### Phase 0 - Repository audit and stable baseline

- Documented the current Expo, React Native, navigation, state, persistence, native, asset, and dependency baseline.
- Added migration, architecture, data-model, testing, and implementation-status documentation.
- Added lint, test, typecheck placeholder, doctor, and development-build scripts.
- Added GitHub Actions baseline CI.
- Removed proven unused direct dependencies without changing the Expo SDK.
- Restored reachability of the existing reminder component for baseline smoke testing.
- Captured Android baseline screenshots.

No product redesign or new product feature was introduced in Phase 0.

### Phase 1 - TypeScript architecture and Kinetic Trace foundation

- Replaced the JavaScript entry/navigation surface with a strict TypeScript app shell.
- Added tokenized Kinetic Trace colors, typography, spacing, surfaces, motion, SVG motifs, and reusable components.
- Added Reanimated motion hooks with system reduced-motion handling.
- Added Today, Train, Nutrition, and Progress tabs, profile access from the avatar, and six placeholder quick actions.
- Added a development-only DesignGallery with component and state demonstrations.
- Removed unreferenced prototype screens, navigation files, components, and AsyncStorage stores from the production tree.
- Added architecture, token, component, navigation, and gallery contract tests.

No feature-specific business logic, persisted data, SQLite migration, or later-phase fitness behavior was introduced.
