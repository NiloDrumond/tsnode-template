import {
  centerOf,
  keyboard,
  mouse,
  screen,
  sleep,
  straightTo,
  Key,
  right,
  Region,
} from '@nut-tree/nut-js';

async function reloadJournal(): Promise<void> {
  const search = await screen.find('RuneLite/Plugin-Search.png');
  try {
    await mouse.move(
      straightTo(
        centerOf(
          screen.find('RuneLite/Plugin-Search-Clear.png', {
            confidence: 0.6,
            searchRegion: new Region(
              search.left,
              search.top,
              search.width + 200,
              search.height,
            ),
          }),
        ),
      ),
    );
    await mouse.leftClick();
  } finally {
    await mouse.move(straightTo(centerOf(search)));
    await mouse.move(right(50));
    await mouse.leftClick();
    await keyboard.type('journal');
    await keyboard.pressKey(Key.Enter);
    await keyboard.releaseKey(Key.Enter);
    try {
      await mouse.move(
        straightTo(
          centerOf(
            screen.find('RuneLite/Toggle-Off.png', { confidence: 0.95 }),
          ),
        ),
      );
      await mouse.leftClick();
    } catch {
      await mouse.move(
        straightTo(
          centerOf(screen.find('RuneLite/Toggle-On.png', { confidence: 0.95 })),
        ),
      );
      await mouse.leftClick();
      await sleep(2000);
      await mouse.leftClick();
    }
    await sleep(1000);
  }
}

export { reloadJournal };
