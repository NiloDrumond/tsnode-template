import {
  centerOf,
  mouse,
  screen,
  straightTo,
  sleep,
  Region,
} from '@nut-tree/nut-js';
import { regions } from '../../core/regions';

// 100
// 30

const CONFIDENCE = 0.9;

async function findTree(confidence: number = CONFIDENCE): Promise<void> {
  sleep(500);
  let region: Region | undefined = undefined;
  try {
    region = await screen.find('Trees/Oak-1.png', {
      searchRegion: regions.game,
      confidence,
    });
  } catch {
    try {
      region = await screen.find('Trees/Oak-2.png', {
        searchRegion: regions.game,
        confidence,
      });
    } catch {
      try {
        region = await screen.find('Trees/Oak-3.png', {
          searchRegion: regions.game,
          confidence,
        });
      } catch {
        findTree(confidence - 0.05);
      }
    }
  }
  if (!region) {
    console.log(`No Oak Tree found with ${confidence} confidence`);
    return;
  }
  await mouse.move(straightTo(centerOf(region)));

  // await sleep(200);
  // await mouse.move(
  //   straightTo(
  //     centerOf(screen.find('Oak-Logs.png', { searchRegion: regions.menu })),
  //   ),
  // );
  // await mouse.leftClick();
}

async function oakChop(): Promise<void> {
  await findTree();
}

export { oakChop };
