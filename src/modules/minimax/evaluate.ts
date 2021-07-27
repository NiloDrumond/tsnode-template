import { COLUMNS_COUNT, ROWS_COUNT } from './data';
import { Cell } from './interfaces';

function evaluateLine(line: Cell[]): number {
  const hasRed = line.includes(Cell.Red);
  const hasBlack = line.includes(Cell.Black);
  if (hasRed && !hasBlack) return 1;
  if (hasBlack && !hasRed) return -1;
  return 0;
}

function evaluateCell(table: number[][], row: number, column: number): number {
  // Down
  let value = 0;
  if (row + 2 < ROWS_COUNT) {
    const line = [
      table[row][column],
      table[row + 1][column],
      table[row + 2][column],
    ];
    value += evaluateLine(line);
  }
  // Down-Right
  if (row + 2 < ROWS_COUNT && column + 2 < COLUMNS_COUNT) {
    const line = [
      table[row][column],
      table[row + 1][column + 1],
      table[row + 2][column + 2],
    ];
    value += evaluateLine(line);
  }
  // Right
  if (column + 2 < COLUMNS_COUNT) {
    const line = [
      table[row][column],
      table[row][column + 1],
      table[row][column + 2],
    ];
    value += evaluateLine(line);
  }
  // Up-Right
  if (row - 2 >= 0 && column + 2 < COLUMNS_COUNT) {
    const line = [
      table[row][column],
      table[row - 1][column + 1],
      table[row - 2][column + 2],
    ];
    value += evaluateLine(line);
  }
  return value;
}

function evaluate(table: number[][]): number {
  let value = 0;
  for (let row = 0; row < table.length; row++) {
    for (let column = 0; column < table[row].length; column++) {
      value += evaluateCell(table, row, column);
    }
  }
  return value;
}

export { evaluate };
