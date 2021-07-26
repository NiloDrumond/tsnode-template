import { ICameFrom, ILine, INode } from './interfaces';

interface IParseResultsDTO {
  costSoFar: Record<number, number>;
  cameFrom: ICameFrom;
  s: INode;
  e: INode;
}

function parseColor(line: ILine): string {
  switch (line) {
    case 'blue':
      return 'azul';
    case 'red':
      return 'vermelha';
    case 'green':
      return 'verde';
    case 'yellow':
      return 'amarela';
  }
}

export function parseResults({
  cameFrom,
  costSoFar,
  e,
  s,
}: IParseResultsDTO): string {
  const pathTaken = [];
  let attempts = 0;
  let last = cameFrom[e.station];
  const MAX_ATTEMPTS = Object.keys(cameFrom).length;
  pathTaken.push(e);
  pathTaken.push(last);
  while (last.station !== s.station || attempts === MAX_ATTEMPTS) {
    last = cameFrom[last.station];
    pathTaken.push(last);
    attempts++;
  }
  let parsedPath = '';
  for (let i = 0; i < pathTaken.length; i++) {
    const index = pathTaken.length - i - 1;
    parsedPath += `${i + 1}a Estação: ${
      pathTaken[index].station
    }, linha: ${parseColor(pathTaken[index].line)}. Duração total: ${
      costSoFar[pathTaken[index].station]
    }s\n`;
  }
  return parsedPath;
}
