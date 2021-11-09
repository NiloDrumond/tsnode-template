import fsExtra from 'fs-extra';
import path from 'path';

function clearTemp(): void {
  fsExtra.emptyDirSync(path.join(process.cwd(), 'temp'));
}

export { clearTemp };
