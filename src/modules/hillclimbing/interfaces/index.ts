export type Coordinates = {
  lat: number;
  lon: number;
};

export interface Node {
  id: number;
  coords: Coordinates;
}

export interface Data {
  [id: number]: Node;
}

export interface HillClimbingResult {
  path: number[];
  timeElapsed: number;
  cost: number;
}
