export const lines = ['red', 'blue', 'yellow', 'green'] as const;
export type ILine = typeof lines[number];

export type ILines = {
  [line in ILine]: number[];
};

export type INode = {
  line: ILine;
  station: number;
};
export type ICameFrom = Record<number, INode>;
