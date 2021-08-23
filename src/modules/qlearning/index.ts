import {
  T,
  getCoord,
  getIndex,
  getRTable,
  qTable,
  terminalStates,
} from './data';
import { Direction as D } from './interfaces';
import { logPolicy, randomEnum, weightedRandom } from './utils';

const ITERATIONS = 5000;
const alpha = 0.5;
const gamma = 1;

function getAction(): D {
  return randomEnum(D);
}

function getNextState(state: number, action: D): number {
  const probs = T[action][state];
  const choosen = weightedRandom(probs);
  const { column, line } = getCoord(state);
  switch (choosen) {
    case D.up:
      return getIndex({ line: line + 1, column });
    case D.right:
      return getIndex({ line: line, column: column + 1 });
    case D.down:
      return getIndex({ line: line - 1, column });
    case D.left:
      return getIndex({ line: line, column: column - 1 });
    case 4:
      return state;
    default:
      return 0;
  }
}

function qUpdate(
  state: number,
  action: D,
  nextState: number,
  rTable: number[],
) {
  const estimatedQ = rTable[state] + gamma * Math.max(...qTable[nextState]);

  const qValue =
    qTable[state][action] + alpha * (estimatedQ - qTable[state][action]);
  return qValue;
}

function getPolicy(): D[] {
  const policy = [];
  for (let state = 0; state < qTable.length; state++) {
    const index = qTable[state].indexOf(Math.max(...qTable[state]));
    policy[state] = index;
  }
  return policy;
}

function qlearning(r: number): void {
  const rTable = getRTable(r);

  for (let i = 0; i < ITERATIONS; i++) {
    let state = 0;
    let terminalReached = false;
    while (!terminalReached) {
      const action = getAction();
      const nextState = getNextState(state, action);
      qTable[state][action] = qUpdate(state, action, nextState, rTable);
      state = nextState;
      if (terminalStates.includes(state)) terminalReached = true;
    }
  }

  const policy = getPolicy();
  logPolicy(policy);
}

export { qlearning };
