# Phase 0 Repository Audit and Stable Baseline Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produce an evidence-backed, documented baseline for the current `workout-trainer` Expo application without introducing redesign or product features.

**Architecture:** Preserve the existing React Navigation and Zustand architecture during the audit. Make only the smallest changes required to boot the app, reach existing core screens, provide baseline scripts, and establish CI; document all other migration work for later phases.

**Tech Stack:** Expo SDK 53, React Native 0.79.2, React 19, React Navigation 7, Zustand 5, AsyncStorage, Reanimated 3.17, Android native project, GitHub Actions.

## Global Constraints

- Do not implement new product features during Phase 0.
- Follow the repository root `AGENTS.md` and the visual contract in `docs/DESIGN_SYSTEM.md`; do not alter product design in this phase.
- Inspect actual files before making assumptions.
- Do not blindly upgrade packages or remove dependencies without usage evidence and compatibility checks.
- Preserve existing user data and existing behavior unless a documented baseline blocker requires a minimal repair.
- Report files, migrations, dependencies, tests, commands, limitations, manual checks, and a suggested commit message.

---

### Task 1: Inventory the repository and capture current configuration

**Files:**
- Read: `package.json`, `app.json`, `eas.json`, `App.js`, `index.js`
- Read: `navigation/`, `screens/`, `components/`, `utils/`, `android/`, `assets/`
- Read: `AGENTS.md`, `docs/DESIGN_SYSTEM.md`
- Create: `docs/AUDIT.md`

- [ ] Enumerate all tracked and untracked files, excluding generated dependency/cache directories from conclusions.
- [ ] Read every source/config file in the requested directories and record the actual navigation, state, persistence, notifications, exercise-data, asset, and dependency usage.
- [ ] Record unused, duplicate, experimental, prerelease, broken, and platform-sensitive items only when supported by repository evidence or official compatibility output.
- [ ] Record hard-coded colours/dimensions and missing loading, error, empty, accessibility, offline, and reduced-motion states without changing them.

### Task 2: Run the current application and establish baseline evidence

**Files:**
- Read: `package.json`, `app.json`, `android/`
- Create: baseline screenshot artifacts under `docs/baseline/` when the environment supports them

- [ ] Install/use the existing lockfile without upgrading dependencies.
- [ ] Run the existing Expo development entry point and native Android development build when an emulator/device is available.
- [ ] Reproduce and record fatal startup, navigation, dashboard, browse, workout creation, and reminder behavior.
- [ ] Run Expo Doctor and record every warning/error exactly in the audit documentation.
- [ ] Check package compatibility using Expo’s supported tooling and official release documentation before proposing an upgrade target.

### Task 3: Apply minimum baseline/tooling repairs

**Files:**
- Modify: `package.json` and `package-lock.json` only for justified scripts or dependency changes
- Modify: `App.js`, `index.js`, or existing source only if a reproduced baseline blocker prevents acceptance criteria
- Create: `.github/workflows/ci.yml`

- [ ] Add scripts for `typecheck` placeholder, `lint`, `test`, `doctor`, `android`, and `ios` development builds using commands appropriate to the existing Expo setup.
- [ ] Add CI that installs from the lockfile and runs lint, tests, type checking when enabled, and Expo Doctor.
- [ ] Repair only root causes confirmed by runtime evidence, using one minimal change at a time.
- [ ] Do not add visual redesign, SQLite, new workout/nutrition behavior, or speculative dependency upgrades.

### Task 4: Record the migration and testing path

**Files:**
- Create/modify: `docs/MIGRATION_PLAN.md`
- Create/modify: `docs/IMPLEMENTATION_STATUS.md`
- Create/modify: `docs/TESTING.md`
- Modify: `docs/AUDIT.md`

- [ ] Select one target stable Expo SDK only after checking current SDK compatibility and documenting whether an incremental path is safer.
- [ ] Document the compatibility path for Expo, React Native, React, Reanimated, Gesture Handler, and Skia, including whether Skia is used.
- [ ] Document existing behavior that must be preserved and explicit future migrations for state, persistence, TypeScript, testing, accessibility, offline, and design-system work.
- [ ] Mark Phase 0 complete only after all acceptance criteria are verified.

### Task 5: Final verification and handoff

- [ ] Run all available local baseline commands from the final `package.json`.
- [ ] Verify the CI workflow is syntactically valid and references only available scripts/tools.
- [ ] Verify screenshots or document the exact environmental blocker if capture is unavailable.
- [ ] Re-read the acceptance criteria line by line and report any unmet item instead of claiming completion.
- [ ] Stop after Phase 0; do not begin the next phase.
