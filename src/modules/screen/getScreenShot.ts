import { Region } from '@nut-tree/nut-js';
import { v4 } from 'uuid';
import path from 'path';
import fs from 'fs';
import screenshot from 'screenshot-desktop';
import sharp from 'sharp';
import sizeof from 'image-size';

async function getScreenShot(
  region?: Region,
  resize?: number,
): Promise<string> {
  try {
    const id = v4();
    const url = path.join(process.cwd(), `/temp/${id}.png`);
    const img = await screenshot();
    if (region) {
      await sharp(img).extract(region).toFile(url);
    } else {
      fs.writeFileSync(url, img);
    }
    if (resize) {
      const resizedUrl = path.join(process.cwd(), `/temp/${id}-resized.png`);
      const { width } = sizeof(url);
      if (!width) return url;
      await sharp(url)
        .resize({ width: width * resize, kernel: 'cubic' })
        .toFile(resizedUrl);
      fs.unlink(url, (err) => {
        if (err) throw err;
      });
      return resizedUrl;
    }
    return url;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export { getScreenShot };
