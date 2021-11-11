import {
  Point,
  screen,
  centerOf,
  mouse,
  straightTo,
  sleep,
} from '@nut-tree/nut-js';
import { Coordinates } from '../../core/interfaces';
import { StateManager } from '../../core/StateManager';
import { ITraining } from '../interfaces/ITraining';

const expectedCoords: Record<number, Coordinates> = {
  1: { x: 3506, y: 3492 },
  2: { x: 3502, y: 3504 },
  3: { x: 3492, y: 3504 },
  4: { x: 3479, y: 3499 },
  5: { x: 3478, y: 3486 },
  6: { x: 3489, y: 3476 },
  7: { x: 3510, y: 3476 },
  8: { x: 3510, y: 3485 },
};

export class Canifis implements ITraining {
  public running = false;
  private state: StateManager;
  private fallen = false;
  private mark = false;
  private currentObstacle = 1;
  private next = true;

  private onPlayerMoved(coords: Coordinates) {
    if (coords === expectedCoords[this.currentObstacle]) {
      this.currentObstacle =
        this.currentObstacle === 8 ? 0 : this.currentObstacle + 1;
      this.next = true;
    }
  }

  private onMarkToggle(on: boolean) {
    this.mark = on;
  }

  constructor(state: StateManager) {
    this.state = state;
    this.state.subscribe({
      event: 'markofgrace-spawn',
      callback: () => this.onMarkToggle(true),
    });
    this.state.subscribe({
      event: 'markofgrace-despawn',
      callback: () => this.onMarkToggle(false),
    });
    this.state.subscribe({
      event: 'position-changed',
      callback: this.onPlayerMoved,
    });
  }

  private async getNextPoint(): Promise<Point> {
    if (this.mark) {
      return centerOf(
        screen.find(`Agility/Canifis-${this.currentObstacle}-Red.png`),
      );
    }
    return centerOf(screen.find(`Agility/Canifis-${this.currentObstacle}.png`));
  }

  public async execute(): Promise<void> {
    this.running = true;
    while (this.running) {
      if (this.next) {
        this.next = false;
        const nextPoint = await this.getNextPoint();
        await mouse.move(straightTo(nextPoint));
        await sleep(Math.random() * 50);
        await mouse.leftClick();
      }
      await sleep(500);
    }
  }
}
