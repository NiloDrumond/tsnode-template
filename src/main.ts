// #!/usr/bin/env node
/// <reference types="./@types/socket.io-client" />
import 'socket.io-client';

// import { initNut } from './modules/nut';
// import { ocr } from './modules/ocr';
// import { openRuneLite, setCameraPosition } from './modules/screen';
// import { getScreenShot } from './modules/screen/getScreenShot';
import { initialize } from './modules/core/initialize';
// import { regions } from './modules/core/regions';
// import { oakFire } from './modules/skills/firemaking/oak';
// import { oakChop } from './modules/skills/woodcutting/oak';
// import { clearTemp } from './utils/clearTemp';
// initNut();

// async function main() {
//   await openRuneLite();
//   await setCameraPosition();
//   await regions.setupMenu();
//   await regions.setupCoordinates();
//   await oakFire();
//   // oakChop();
//   // const img = await getScreenShot(regions.coordinates);
//   // const txt = await ocr(img);
//   // console.log(txt);
//   // clearTemp();
// }

// main();

initialize({ type: 'agility', subType: 'canifis' });
