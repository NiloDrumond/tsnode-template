import { sleep } from '@nut-tree/nut-js';
import { initNut } from '../infra/nut';
import { io } from '../infra/socket';
import { openRuneLite, setCameraPosition } from '../screen';
import { reloadJournal } from '../screen/reloadJournal';
import { Training } from '../training/interfaces';
import { TrainingFactory } from '../training/TrainingFactory';
import { regions } from './regions';
import { StateManager } from './StateManager';

export async function initialize(train: Training): Promise<void> {
  initNut();
  // await reloadJournal();

  io.on('connection', async (socket) => {
    const stateManager = new StateManager(socket);
    await openRuneLite();
    await setCameraPosition();
    await regions.setupMenu();
    // await regions.setupCoordinates();
    const training = TrainingFactory(train, stateManager);
    training.execute();
  });

  await sleep(150000);
}
