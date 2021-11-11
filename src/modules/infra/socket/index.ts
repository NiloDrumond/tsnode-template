import { createServer } from 'https';
import { Server } from 'socket.io';

// import io from 'socket.io-client';

// const socket = io('http://localhost:1917', { reconnection: true });

// export { socket };

const httpServer = createServer();

const io = new Server(httpServer);

io.listen(1917);
console.log('Listening on port 1917');

export { io };
