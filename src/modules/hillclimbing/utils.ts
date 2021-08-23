import { map } from './data';

const calculateDistance = (p: number[], q: number[]): number => {
  if (p.length != q.length) return -1;
  const subtracted = q.map((i, n) => i - p[n]);
  const powered = subtracted.map((e) => Math.pow(e, 2));
  const sum = powered.reduce((total, current) => total + current, 0);
  return Math.sqrt(sum);
};

function shuffle(array: any[]) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function generateRandomPath(): number[] {
  const keys = Object.keys(map);
  return shuffle(keys);
}

export { calculateDistance, generateRandomPath };
