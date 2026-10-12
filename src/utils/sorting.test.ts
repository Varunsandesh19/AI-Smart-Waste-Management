import assert from 'node:assert/strict';
import test from 'node:test';
import { getSortingTargetX, SORTING_TARGETS } from './sorting';
import { WasteCategory } from '../types/waste';

test('each waste category animates to its matching flap and collection bin', () => {
  const expectedDestinations: Record<WasteCategory, [number, number]> = {
    'Wet Waste': [520, 517],
    Plastic: [590, 587],
    Paper: [660, 657],
    Metal: [730, 727],
  };

  for (const [category, [flapX, binCenterX]] of Object.entries(expectedDestinations) as [
    WasteCategory,
    [number, number],
  ][]) {
    assert.equal(SORTING_TARGETS[category].flapX, flapX);
    assert.equal(SORTING_TARGETS[category].binCenterX, binCenterX);
    assert.equal(getSortingTargetX(category, 6), flapX);
    assert.equal(getSortingTargetX(category, 7), binCenterX);
  }
});
