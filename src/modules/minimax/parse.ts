import { Tree } from './interfaces';

export function parseTree(tree: Tree, acc: string): string {
  console.log('Nó:\n');
  console.log(`Valor: ${tree.value}\n`);
  console.log(`Ações: ${tree.actions.toString()}\n`);
  console.log('Filhos: \n');
  for (let i = 0; i < tree.children.length; i++) {
    parseTree(tree.children[i], acc);
  }
  console.log('\n');
  return acc;
}
