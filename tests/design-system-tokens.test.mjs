import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (file) => fs.readFileSync(`${process.cwd()}/${file}`, 'utf8');

test('Kinetic Trace tokens define dark canvas, lime action, and minimum target', () => {
  const colors = read('src/design-system/tokens/colors.ts');
  const spacing = read('src/design-system/tokens/spacing.ts');
  const motion = read('src/design-system/tokens/motion.ts');
  assert.match(colors, /canvas/);
  assert.match(colors, /lime/);
  assert.match(spacing, /minimumTouchTarget/);
  assert.match(motion, /reduced/);
});
