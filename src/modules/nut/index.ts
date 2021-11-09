import { screen, mouse } from '@nut-tree/nut-js';

function initNut(): void {
  screen.config.confidence = 0.8;
  screen.config.resourceDirectory = './assets';
  mouse.config.mouseSpeed = 50000;
}

export { initNut };
