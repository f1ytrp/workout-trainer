import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const root = process.cwd();

test('phase 1 has a typed root and strict typecheck script', () => {
  assert.equal(fs.existsSync(`${root}/src/app/App.tsx`), true);
  assert.equal(fs.existsSync(`${root}/src/types/navigation.ts`), true);
  const packageJson = JSON.parse(fs.readFileSync(`${root}/package.json`, 'utf8'));
  assert.match(packageJson.scripts.typecheck, /tsc --noEmit/);
  assert.equal(fs.existsSync(`${root}/tsconfig.json`), true);
});
