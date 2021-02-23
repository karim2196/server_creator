import socketIo from 'socket.io'
import {Server} from 'http';

export function setupSockets(server: Server) {
    let s = socketIo(server);
    s.use((socket, next) => {
// return the result of next() to accept the connection.
      next();
    });
    return s;
}
