import { HillClimbingResult } from './interfaces';
import { map } from './data';
import { calculateDistance, generateRandomPath } from './utils';

const RETRY_COUNT = 100;

function evaluate(path: number[]): number {
  let totalCost = 0;
  for (let i = 0; i < path.length - 1; i++) {
    totalCost += calculateDistance(
      [map[path[i]].coords.lat, map[path[i]].coords.lon],
      [map[path[i + 1]].coords.lat, map[path[i + 1]].coords.lon],
    );
  }
  return totalCost;
}

function getNewPath(path: number[], i: number): number[] {
  const newPath = [...path];
  const aux = newPath[i];
  newPath[i] = newPath[i + 1];
  newPath[i + 1] = aux;
  return newPath;
}

function hillclimbing(): HillClimbingResult {
  let bestCost = Infinity;
  let bestPath: number[] = [];
  const startTime = new Date();

  for (let r = 0; r < RETRY_COUNT; r++) {
    let path: number[] = generateRandomPath();
    let currentCost = evaluate(path);
    let running = true;
    while (running) {
      const newCosts: number[] = [];
      for (let i = 0; i < path.length - 1; i++) {
        const newPath = getNewPath(path, i);
        newCosts[i] = evaluate(newPath);
      }
      const sorted = [...newCosts].sort((a, b) => a - b);
      const index = newCosts.findIndex((v) => v === sorted[0]);

      // Parada
      if (currentCost < newCosts[index]) {
        running = false;
      }
      path = getNewPath(path, index);
      currentCost = newCosts[index];
    }

    const cost = evaluate(path);

    if (cost < bestCost) {
      bestCost = cost;
      bestPath = path;
    }
  }
  const endTime = new Date();
  const timeElapsed = (endTime.getTime() - startTime.getTime()) / 1000;
  return {
    path: bestPath,
    timeElapsed,
    cost: bestCost,
  };
}

export { hillclimbing };
