import { NumberInRange } from '../types/types';

export function generateRandomId(
  min: number,
  max: number
): NumberInRange<typeof min, typeof max> {
  // Check for valid input
  if (min > max) {
    throw new Error('min must be less than or equal to max');
  }

  if (min < 1) {
    throw new Error('min must be greater than or equal to 1');
  }

  if (max > 898) {
    throw new Error('max must be less than or equal to 898');
  }

  // Generate random ID
  const randomId = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomId as NumberInRange<typeof min, typeof max>;
}
