import _ from 'lodash';
import { Socket } from 'socket.io';
import {
  State,
  SocketEvents,
  StateObserver,
  ObserversMap,
} from './interfaces/state';

const initialState: State = {
  coordinates: {
    x: 0,
    y: 0,
  },
};

const initialObservers: ObserversMap = {
  'markofgrace-despawn': [],
  'markofgrace-spawn': [],
  'position-changed': [],
  tick: [],
};

export class StateManager {
  public state: State;
  private socket: Socket;
  private observers: ObserversMap;

  private setup() {
    this.socket.on(SocketEvents.Tick, (s: State) => {
      if (_.isEqual(s.coordinates, this.state.coordinates)) {
        for (let i = 0; i < this.observers['position-changed'].length; i++) {
          this.observers['position-changed'][i].callback(s.coordinates);
        }
      }
      this.state = s;
    });
    this.socket.on(SocketEvents.MarkOfGraceSpawn, () => {
      for (let i = 0; i < this.observers['markofgrace-spawn'].length; i++) {
        this.observers['markofgrace-spawn'][i].callback();
      }
    });
    this.socket.on(SocketEvents.MarkOfGraceDespawn, () => {
      for (let i = 0; i < this.observers['markofgrace-despawn'].length; i++) {
        this.observers['markofgrace-despawn'][i].callback();
      }
    });
  }

  constructor(socket: Socket) {
    this.socket = socket;
    this.state = initialState;
    this.observers = initialObservers;
    this.setup();
  }

  public subscribe(observer: StateObserver): () => void {
    function unsubscribe(observers: ObserversMap) {
      observers[observer.event] = observers[observer.event].filter(
        (o) => o !== observer,
      );
    }
    this.observers[observer.event].push(observer);
    return () => unsubscribe(this.observers);
  }
}
