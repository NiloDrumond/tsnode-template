import { Cell } from './interfaces';

const ROWS_COUNT = 3;
const COLUMNS_COUNT = 4;

// Initialize Table
const table: Cell[][] = [];
for (let i = 0; i < ROWS_COUNT; i++) {
  table[i] = [];
  for (let j = 0; j < COLUMNS_COUNT; j++) {
    table[i][j] = Cell.Empty;
  }
}

// Initial Position

table[2][0] = Cell.Red;
table[2][2] = Cell.Black;

export { table, ROWS_COUNT, COLUMNS_COUNT };
