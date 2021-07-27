import { table, COLUMNS_COUNT, ROWS_COUNT } from './data';
import { Tree, Cell } from './interfaces';
import util from 'util';
import { parseTree } from './parse';
import { evaluate } from './evaluate';

const DEPTH = 2;

function mountTable(table: number[][], actions: number[]): number[][] {
  const newTable: number[][] = [];
  for (let i = 0; i < table.length; i++) newTable[i] = table[i].slice();
  for (let i = 0; i < actions.length; i++) {
    const column = actions[i];
    const color = i % 2 === 0 ? Cell.Red : Cell.Black;
    let row = ROWS_COUNT - 1;
    while (row >= 0) {
      if (newTable[row][column] === Cell.Empty) {
        newTable[row][column] = color;
        break;
      }
      row--;
    }
  }
  return newTable;
}

function minimax(table: number[][], actions: number[], max: boolean): Tree {
  if (actions.length === DEPTH) {
    return {
      value: evaluate(mountTable(table, actions)),
      children: [],
      actions,
    };
  }
  const children: Tree[] = [];
  for (let i = 0; i < COLUMNS_COUNT; i++) {
    children[i] = minimax(table, [...actions, i], !max);
  }
  const value = max
    ? Math.max(...children.map((n) => n.value))
    : Math.min(...children.map((n) => n.value));
  return { value, children, actions };
}

function main(): void {
  const tree = minimax(table, [], true);
  //console.log(tree);
  console.log(util.inspect(tree, false, null, true /* enable colors */));
}

export default main;
