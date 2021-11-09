import { centerOf, mouse, screen, straightTo } from '@nut-tree/nut-js';

async function openRuneLite(): Promise<void> {
  await mouse.move(
    straightTo(centerOf(screen.find('Ubuntu-RuneLite-Icon.png'))),
  );
  await mouse.leftClick();
  await screen.waitFor('Menu-Bottom.png', 5000);
}

export { openRuneLite };
