import { JarSlot } from '@/types/birthday';

export const jarSlots: readonly JarSlot[] = [
  { x: 12, y: 8, r: -12, w: 58, h: 34 },
  { x: 52, y: 10, r: 9, w: 54, h: 36 },
  { x: 30, y: 38, r: -5, w: 60, h: 34 },
  { x: 6, y: 50, r: 16, w: 52, h: 32 },
  { x: 56, y: 52, r: -18, w: 56, h: 34 },
  { x: 30, y: 82, r: 7, w: 62, h: 38 },
] as const;

export const JAR_SLOTS = jarSlots;

export default jarSlots;
