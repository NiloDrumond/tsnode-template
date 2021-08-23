import { Direction } from './interfaces';

function randomEnum<T>(anEnum: T): T[keyof T] {
  const enumValues = Object.keys(anEnum)
    .map((n) => Number.parseInt(n))
    .filter((n) => !Number.isNaN(n)) as unknown as T[keyof T][];
  const randomIndex = Math.floor(Math.random() * enumValues.length);
  const randomEnumValue = enumValues[randomIndex];
  return randomEnumValue;
}

function weightedRandom(probs: number[]): number {
  let sum = 0;
  const r = Math.random();
  for (let i = 0; i < probs.length; i++) {
    sum += probs[i];
    if (r <= sum) return i;
  }
  return 4;
}

function logPolicy(policy: Direction[]): void {
  console.log(policy.slice(8, policy.length));
  console.log(policy.slice(4, 8));
  console.log(policy.slice(0, 4));
}

export { randomEnum, weightedRandom, logPolicy };
