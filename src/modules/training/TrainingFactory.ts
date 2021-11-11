import { StateManager } from '../core/StateManager';
import { Canifis } from './agility/Canifis';
import { Training } from './interfaces';
import { ITraining } from './interfaces/ITraining';

function TrainingFactory(
  training: Training,
  stateManager: StateManager,
): ITraining {
  switch (training.type) {
    case 'agility':
      switch (training.subType) {
        case 'canifis':
          return new Canifis(stateManager);
      }
  }
}

export { TrainingFactory };
