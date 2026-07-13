# Testing and Validation

## Phase 1 automated checks

Run from the repository root:

```powershell
npm ci --prefer-offline --no-audit --no-fund
npm run typecheck
npm run lint
npm test
npm run doctor
npx expo export --platform android --output-dir <temporary-output-directory>
npm run android:dev
```

The Node test runner covers typed architecture/file contracts, token invariants, requested component exports and touch-target usage, exact navigation/quick-action labels, and the development gallery contract. The tests avoid pretending to render native views in Node; native layout and accessibility behavior still require a development-build smoke pass.

## DesignGallery manual checklist

- [ ] App launches on a dark canvas without a white screen or splash.
- [ ] Today, Train, Nutrition, and Progress tabs share the same dark shell.
- [ ] Central orb opens the six natural-language quick actions.
- [ ] Avatar opens Profile; Profile is not a bottom tab.
- [ ] Buttons demonstrate primary, secondary, loading, disabled, text, icon, and orb states.
- [ ] Solid and selective glass surfaces are visible.
- [ ] Typography, metric, bar, arc, heat cell, signal trace, and corner brackets render.
- [ ] Empty, error, skeleton, toast, form, and bottom-sheet states render.
- [ ] Reduced-motion status is visible and transitions become immediate when enabled.
- [ ] Interactive controls meet the 48×48 target and expose labels.

## Known limitations

Expo Doctor reports the SDK 53 patch/native configuration warnings recorded in `docs/AUDIT.md`. iOS cannot be smoke-tested on Windows. Phase 1 does not validate later feature data behavior.
