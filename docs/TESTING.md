# Testing and Baseline Validation

## Current testing state

The repository is still JavaScript and has no automated component, navigation, or store tests. Phase 0 adds repeatable commands and CI without pretending that coverage exists.

## Baseline commands

Run from the repository root:

```powershell
npm ci --prefer-offline --no-audit --no-fund
npm run lint
npm test
npm run typecheck
npm run doctor
npx expo export --platform android --output-dir <temporary-output-directory>
npm run android:dev
```

The iOS command is supported only on macOS with Xcode and an iOS simulator/device:

```bash
npm run ios:dev
```

Results for Phase 0:

- Lint passed with 20 legacy warnings and no errors.
- Node tests passed with zero test files.
- Typecheck placeholder passed.
- Expo Doctor ran and reported four documented baseline failures; this is expected until the SDK/native alignment work.
- Android development build passed and launched on `emulator-5554`.

## CI baseline

`.github/workflows/ci.yml` runs `npm ci`, lint, tests, the typecheck placeholder, and Expo Doctor. The Doctor step is allowed to report known baseline failures while keeping the complete output visible; it must become blocking after dependency alignment.

## Manual smoke checklist

Development-build smoke testing completed on Android:

- [x] App launches without a fatal red screen after the notification permission decision.
- [x] Dashboard renders its start-workout card and local exercise cards.
- [x] Browse tab opens the body-part browser.
- [x] Profile tab opens and renders the profile summary.
- [x] Workout session empty state is reachable with no persisted workouts.
- [x] Existing reminder control is reachable from the empty workout session after the minimum reachability repair.
- [x] Reminder control opens the native time picker and can be cancelled.
- [x] Body-part browser opens the ExerciseList and live ExerciseDB results rendered for Chest during smoke testing.
- [x] Android back/navigation stack was exercised through the main tab and browse flows.
- [ ] New workout creation and add-to-existing-workout flow: not completed in this baseline run and remains a known follow-up verification item.
- [ ] Notification scheduling after permission grant: not completed; permission denial behavior was observed and documented.
- [ ] iOS smoke testing: unavailable on Windows and no `ios/` directory is checked in.

## Baseline screenshots

Stored in `docs/baseline/`:

- [x] `dashboard.png`
- [x] `workout-list.png`
- [x] `exercise-browser.png`
- [x] `profile.png`
- [x] `reminder.png`

These screenshots are baseline evidence only and must not be treated as the Phase 1 Kinetic Trace redesign.

## Test layers to add after baseline

| Layer | Initial targets |
| --- | --- |
| Pure unit | `TimerFormat`, cache expiry/parse behavior, domain validation, migration transforms |
| Store tests | Workout add/append, total-time aggregation, storage rehydration and migration fallback |
| Component tests | Loading/empty/error branches, timer controls, reminder permission/error branches |
| Navigation tests | Dashboard -> workout, Browse -> body part -> list -> detail, Profile reachability |
| Native smoke | Android development build, notification scheduling, WebView/image rendering, reduced-motion behavior |
| Accessibility | Labels, hints, focus order, minimum 48 x 48 targets, contrast, reduced motion |

## Known limitations of this phase

- Existing JavaScript screens are not typechecked.
- No automated component or navigation tests exist yet.
- Offline behavior is not yet a product guarantee; the audit records current cache behavior and gaps.
- iOS cannot be smoke-tested in the current Windows environment.
- The first native build is slow because multiple New Architecture C++ modules, including used prerelease Skia, compile locally.
