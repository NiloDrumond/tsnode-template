import { Coordinates } from '.';

export interface State {
  coordinates: Coordinates;
}

export const SocketEvents = {
  Tick: 'tick',
  MarkOfGraceSpawn: 'markofgrace-spawn',
  MarkOfGraceDespawn: 'markofgrace-despawn',
} as const;

export type SocketEvent = typeof SocketEvents[keyof typeof SocketEvents];
// Observers

export type StateEvent = 'position-changed' | SocketEvent;

export interface ObserversMap extends Record<StateEvent, any[]> {
  'position-changed': OnPlayerMoved[];
  'markofgrace-spawn': DefaultEvent[];
  'markofgrace-despawn': DefaultEvent[];
}

interface BaseEvent {
  event: StateEvent;
}

export interface DefaultEvent {
  event: StateEvent;
  callback: () => void;
}

export interface OnPlayerMoved extends BaseEvent {
  event: 'position-changed';
  callback: (coord: Coordinates) => void;
}

export type StateObserver = OnPlayerMoved | DefaultEvent;
