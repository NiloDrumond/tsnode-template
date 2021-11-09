import { Point } from '@nut-tree/nut-js';
import { calculateDistance } from './calculateDistance';

function moved(a: Point, b: Point, minDistance = 10): boolean {
  const distance = calculateDistance([a.x, a.y], [b.x, b.y]);
  return distance < minDistance;
}

export { moved };
