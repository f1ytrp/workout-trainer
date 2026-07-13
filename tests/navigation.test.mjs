import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('navigation shell defines the four Phase 1 tabs', () => {
  const source = fs.readFileSync(`${process.cwd()}/src/navigation/MainTabNavigator.tsx`, 'utf8');
  for (const label of ['Today', 'Train', 'Nutrition', 'Progress']) assert.match(source, new RegExp(label));
  assert.doesNotMatch(source, /name=["']Profile["']/);
});

test('quick actions use natural language labels', () => {
  const source = fs.readFileSync(`${process.cwd()}/src/navigation/QuickActionSheet.tsx`, 'utf8');
  for (const label of ['Start workout', 'Log food', 'Add water', 'Check in', 'Log bodyweight', 'Ask coach']) {
    assert.match(source, new RegExp(label));
  }
});
