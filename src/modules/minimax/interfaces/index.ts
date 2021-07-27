export enum Cell {
  Empty,
  Red,
  Black,
}

export interface Tree {
  value: number;
  actions: number[];
  children: Tree[];
}
