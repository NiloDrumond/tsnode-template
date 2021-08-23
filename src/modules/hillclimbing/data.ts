import fs from 'fs';
import path from 'path';
import { Data } from './interfaces';

let writing = false;

const map: Data = {};
try {
  const data = fs.readFileSync(path.resolve(__dirname, './dj38.tsp'), 'utf8');
  const lines = data.split('\n');
  for (let i = 0; i < lines.length - 1; i++) {
    if (writing) {
      const [id, lat, lon] = lines[i].split(' ');
      map[parseInt(id)] = {
        id: parseInt(id),
        coords: { lat: parseFloat(lat), lon: parseFloat(lon) },
      };
    }
    if (lines[i].includes('NODE_COORD_SECTION')) {
      writing = true;
    }
  }
} catch (err) {
  console.log(err);
}

export { map };
