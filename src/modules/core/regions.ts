import { screen, Region, sleep } from '@nut-tree/nut-js';

interface Regions {
  menu?: Region;
  coordinates?: Region;
  game: Region;
  setupMenu: () => Promise<void>;
  setupCoordinates: () => Promise<void>;
}

const UBUNTU_gameRegion: Region = new Region(70, 50, 1800, 1030);

export const regions: Regions = {
  menu: undefined,
  coordinates: undefined,
  game: UBUNTU_gameRegion,
  setupMenu: async () => {
    regions.menu = new Region(1620, 680, 300, 400);
  },
  setupCoordinates: async () => {
    regions.coordinates = await screen.find('Tile-Text.png');
    regions.coordinates.width += 68;
    regions.coordinates.left += 32;
  },
};
