# Data Model Boundary

## Phase 1

Phase 1 creates no confirmed user records and adds no database. Placeholder screens and quick actions must not seed workouts, nutrition, hydration, recovery, bodyweight, or profile data. The DesignGallery uses static component examples only.

## Existing data boundary

The prototype’s AsyncStorage keys (`workout-storage` and `total-time-storage`) are no longer imported by the Phase 1 shell. They are not silently migrated or deleted in this phase. A future database phase must read them through a versioned migration adapter, preserve valid records, surface malformed records as recoverable errors, and write SQLite as the source of truth.

## Future ownership

- `src/database`: schema and versioned migrations.
- `src/repositories`: local-first reads/writes.
- `src/stores`: temporary UI state and active workout only.
- `src/types`: validated domain records distinguishing suggestions from confirmed user records.

Recovery guidance must remain educational and non-medical. No Phase 1 code estimates recovery or diagnoses injury.
