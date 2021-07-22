import { connections, distances, lines } from './data';
import { ICameFrom, ILine, INode } from './interfaces';
import { MinPriorityQueue } from '@datastructures-js/priority-queue';
// m/s
const TRAIN_SPEED = 30;
const SWAP_TIME = 4 * 60;

function heuristic(a: number, b: number) {
  return distances[a][b];
}

function getLine(a: number, b: number): ILine | undefined {
  const keys = Object.keys(lines) as ILine[];
  for (let i = 0; i < keys.length; i++) {
    if (lines[keys[i]].includes(a) && lines[keys[i]].includes(b)) {
      return keys[i];
    }
  }
  return undefined;
}

function astar(s: INode, e: INode): void {
  const frontier = new MinPriorityQueue<INode>();
  frontier.enqueue(s, 0);
  const costSoFar: Record<number, number> = {};
  const cameFrom: ICameFrom = {};
  costSoFar[s.station] = 0;
  cameFrom[s.station] = s;

  while (!frontier.isEmpty()) {
    const current = frontier.dequeue().element;
    const neighbors = connections[current.station];
    if (current.station === e.station) {
      if (current.line !== e.line) {
        cameFrom[e.station] = { ...cameFrom[e.station], line: e.line };
        costSoFar[e.station] += SWAP_TIME;
      }
      break;
    }

    for (let i = 0; i < neighbors.length; i++) {
      const next = neighbors[i];

      let cost = costSoFar[current.station] + (next.d / TRAIN_SPEED) * 3600;
      const last = cameFrom[current.station];
      if (last && last.line && !lines[last.line].includes(next.s)) {
        cost += SWAP_TIME;
      }
      if (costSoFar[next.s] === undefined || costSoFar[next.s] > cost) {
        costSoFar[next.s] = cost;
        const priority = cost + heuristic(next.s, e.station);
        const line = getLine(current.station, next.s);
        frontier.enqueue({ station: next.s, line }, priority);
        cameFrom[next.s] = {
          station: current.station,
          line,
        };
      }
    }
  }
  console.log('END:');
  console.log(cameFrom);
  console.log('-----------------------------');
  console.log(costSoFar);
}

export { astar };
