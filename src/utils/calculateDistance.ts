const calculateDistance = (p: number[], q: number[]): number => {
  if (p.length != q.length) return -1;
  const subtracted = q.map((i, n) => i - p[n]);
  const powered = subtracted.map((e) => Math.pow(e, 2));
  const sum = powered.reduce((total, current) => total + current, 0);
  return Math.sqrt(sum);
};

export { calculateDistance };
