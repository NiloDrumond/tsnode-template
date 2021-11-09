import {
  centerOf,
  mouse,
  screen,
  straightTo,
  sleep,
  left,
  Point,
} from '@nut-tree/nut-js';
import { MENU } from '../../shared/constants';
import { getCoordinates } from '../../shared/getCoordinates';
import { Coordinates } from '../../shared/interfaces';
import { regions } from '../../shared/regions';

const logs = 26;
const { HORIZONTAL_GAP, VERTICAL_GAP, COLUMNS } = MENU;

function getItemPosition(t: Point, i: number): Point {
  const h = (i + 2) % COLUMNS;
  const v = Math.floor((i + 2) / COLUMNS);
  return new Point(t.x - h * HORIZONTAL_GAP, t.y - v * VERTICAL_GAP);
}

async function oakFire(): Promise<void> {
  const tinderBox = await centerOf(
    screen.find('Tinderbox.png', { searchRegion: regions.menu }),
  );
  let coords: Coordinates = await getCoordinates();

  async function makeFire(position: Point): Promise<Coordinates> {
    await mouse.move(straightTo(tinderBox));
    await mouse.leftClick();
    await sleep(200);
    await mouse.move(straightTo(position));
    await mouse.leftClick();
    await sleep(500);
    await mouse.move(left(300));
    for (let i = 0; i < Infinity; i++) {
      const newCoords = await getCoordinates();
      if (newCoords.x !== coords.x || newCoords.y !== coords.y) {
        return newCoords;
      }
      await sleep(1000);
    }
    return coords;
  }
  for (let i = 0; i < logs; i++) {
    coords = await makeFire(getItemPosition(tinderBox, i));
  }
}

export { oakFire };
