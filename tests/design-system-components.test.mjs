import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const required = [
  'AppScreen', 'AppScrollView', 'Surface', 'GlassSurface', 'KineticCard',
  'PrimaryButton', 'SecondaryButton', 'TextButton', 'IconButton',
  'FloatingActionOrb', 'Chip', 'SegmentedControl', 'MetricValue',
  'ProgressBar', 'ProgressArc', 'SectionHeader', 'EmptyState', 'ErrorState',
  'Skeleton', 'Toast', 'BottomSheet', 'ConfirmationSheet', 'FormField',
  'NumericField', 'KineticCardFrame', 'HeatCell',
];

test('all requested design-system component exports exist', () => {
  const index = fs.readFileSync(`${process.cwd()}/src/design-system/components/index.ts`, 'utf8');
  for (const name of required) assert.match(index, new RegExp(`\\b${name}\\b`));
});

test('interactive design components declare the minimum touch target', () => {
  const actions = fs.readFileSync(`${process.cwd()}/src/design-system/components/actions.tsx`, 'utf8');
  assert.match(actions, /minimumTouchTarget/);
});
