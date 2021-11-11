import { screen, mouse, keyboard } from '@nut-tree/nut-js';

function initNut(): void {
  screen.config.confidence = 0.8;
  screen.config.resourceDirectory = './assets';
  mouse.config.mouseSpeed = 50000;
  keyboard.config.autoDelayMs = 100;
}

export { initNut };
