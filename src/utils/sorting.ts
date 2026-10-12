import { WasteCategory } from '../types/waste';

export const SORTING_TARGETS: Record<
  WasteCategory,
  { flapX: number; binCenterX: number; color: string }
> = {
  'Wet Waste': { flapX: 520, binCenterX: 517, color: '#10B981' },
  Plastic: { flapX: 590, binCenterX: 587, color: '#06B6D4' },
  Paper: { flapX: 660, binCenterX: 657, color: '#EAB308' },
  Metal: { flapX: 730, binCenterX: 727, color: '#EF4444' },
};

export const SORTING_CATEGORIES = Object.keys(SORTING_TARGETS) as WasteCategory[];

export function getSortingTargetX(category: WasteCategory, stage: 6 | 7): number {
  const target = SORTING_TARGETS[category];
  return stage === 6 ? target.flapX : target.binCenterX;
}
