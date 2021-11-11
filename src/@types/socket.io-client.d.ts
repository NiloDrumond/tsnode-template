declare module 'socket.io-client' {
  export interface Io {
    (url: string, options: any): Socket;
  }
  declare const io: Io;
  export default io;
  export interface Socket {
    id: string;
    on(event: string, callback: (data: any) => void);
    onAny(callback: (data: any) => void);
    emit(event: string, data: any);
  }
}
