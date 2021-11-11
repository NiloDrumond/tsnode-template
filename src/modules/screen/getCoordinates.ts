import { getScreenShot } from '../screen/getScreenShot';
import { Coordinates } from '../core/interfaces';
import fs from 'fs';
import { regions } from '../core/regions';
import { ocr } from '../infra/ocr';

async function getCoordinates(): Promise<Coordinates> {
  const img = await getScreenShot(regions.coordinates, 6);
  const txt = await ocr(img);
  fs.unlink(img, (err) => {
    if (err) throw err;
  });
  const parts = txt.split(',');
  if (parts.length < 3) throw new Error(`failed to get coordinate. Got ${txt}`);
  return { x: parseInt(parts[0]), y: parseInt(parts[1]) };
}

export { getCoordinates };
