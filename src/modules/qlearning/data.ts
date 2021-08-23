import { Coordinate, Direction as D } from './interfaces';

const ROWS = 3;
const COLUMNS = 4;
const ACTIONS = 4;

function getIndex({ column, line }: Coordinate): number {
  return line * COLUMNS + column;
}

function getCoord(index: number): Coordinate {
  const line = Math.floor(index / COLUMNS);
  const column = index % COLUMNS;
  return { column, line };
}

function getRTable(r: number): number[] {
  const rTable: number[] = new Array(ROWS * COLUMNS);
  for (let i = 0; i < rTable.length; i++) {
    switch (i) {
      case 5:
        rTable[i] = 0;
        break;
      case 3:
        rTable[i] = 0.2;
        break;
      case 7:
        rTable[i] = -1;
        break;
      case 11:
        rTable[i] = 1;
        break;
      default:
        rTable[i] = r;
    }
  }
  return rTable;
}

const qTable: number[][] = new Array(ROWS * COLUMNS);
for (let i = 0; i < qTable.length; i++) {
  switch (i) {
    case 3:
      qTable[i] = [0.2, 0.2, 0.2, 0.2];
      break;
    case 7:
      qTable[i] = [-1, -1, -1, -1];
      break;
    case 11:
      qTable[i] = [1, 1, 1, 1];
      break;
    default:
      qTable[i] = [0, 0, 0, 0];
  }
}

function canMoveTo({ column, line }: Coordinate): boolean {
  return !(
    line >= ROWS ||
    line < 0 ||
    column >= COLUMNS ||
    column < 0 ||
    (line === 1 && column === 1)
  );
}

const SIDE = 0.1;
const FRONT = 0.8;
const T: number[][][] = [];
for (let a = 0; a < ACTIONS; a++) {
  T[a] = [];
  for (let line = 0; line < ROWS; line++) {
    for (let column = 0; column < COLUMNS; column++) {
      const probs = [0, 0, 0, 0, 0];
      switch (a) {
        case D.up:
          if (canMoveTo({ line: line + 1, column })) {
            probs[0] += FRONT;
          } else {
            probs[4] += FRONT;
          }
          if (canMoveTo({ line, column: column + 1 })) {
            probs[1] += SIDE;
          } else {
            probs[4] += SIDE;
          }
          if (canMoveTo({ line, column: column - 1 })) {
            probs[3] += SIDE;
          } else {
            probs[4] += SIDE;
          }
          break;
        case D.right:
          if (canMoveTo({ line: line + 1, column })) {
            probs[0] += SIDE;
          } else {
            probs[4] += SIDE;
          }
          if (canMoveTo({ line, column: column + 1 })) {
            probs[1] += FRONT;
          } else {
            probs[4] += FRONT;
          }
          if (canMoveTo({ line: line - 1, column: column })) {
            probs[2] += SIDE;
          } else {
            probs[4] += SIDE;
          }
          break;
        case D.down:
          if (canMoveTo({ line, column: column - 1 })) {
            probs[3] += SIDE;
          } else {
            probs[4] += SIDE;
          }
          if (canMoveTo({ line, column: column + 1 })) {
            probs[1] += SIDE;
          } else {
            probs[4] += SIDE;
          }
          if (canMoveTo({ line: line - 1, column: column })) {
            probs[2] += FRONT;
          } else {
            probs[4] += FRONT;
          }
          break;
        case D.left:
          if (canMoveTo({ line, column: column - 1 })) {
            probs[3] += FRONT;
          } else {
            probs[4] += FRONT;
          }
          if (canMoveTo({ line: line - 1, column: column })) {
            probs[2] += SIDE;
          } else {
            probs[4] += SIDE;
          }
          if (canMoveTo({ line: line + 1, column: column })) {
            probs[0] += SIDE;
          } else {
            probs[4] += SIDE;
          }
          break;
        default:
          break;
      }
      T[a][getIndex({ column, line })] = probs;
    }
  }
}

const terminalStates = [3, 7, 11];

export { getRTable, qTable, T, getCoord, getIndex, terminalStates };
