# Data Model Baseline

## Current persisted records

### Workout store

AsyncStorage key: `workout-storage`

```text
workouts: [{
  name: string,
  exercise: Exercise[]
}]
```

The current store has no schema version or migration function. `Exercise` records are API-shaped objects and are appended to a workout by name.

### Total-time store

AsyncStorage key: `total-time-storage`

```text
totalWorkoutTime: number
lastWorkoutDay: string
dailyWorkoutDuration: Record<string, number>
```

The current store has no schema version or migration function.

## Non-persisted or cached data

- ExerciseDB responses use a six-hour AsyncStorage cache.
- `getAllExercise` also holds a module-level in-memory cache.
- Active timer state is local component state and interval-driven.
- Reminder time is not persisted as an application record; the OS notification scheduler is the current external side effect.

## Migration constraints

Future SQLite migrations must preserve existing AsyncStorage workout and total-time data through explicit, versioned transforms. Suggestions and remote exercise records must remain distinguishable from confirmed user workout records.
