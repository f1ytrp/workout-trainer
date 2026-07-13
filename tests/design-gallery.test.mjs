import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('development gallery includes all contract sections and is development-only', () => {
  const source = fs.readFileSync(`${process.cwd()}/src/features/design-gallery/DesignGalleryScreen.tsx`, 'utf8');
  for (const label of ['Buttons', 'Surfaces', 'Typography', 'Progress', 'SVG motifs', 'Empty and error states', 'Bottom sheet', 'Reduced motion']) {
    assert.match(source, new RegExp(label));
  }
  assert.match(source, /__DEV__/);
});
