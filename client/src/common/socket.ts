import * as io from 'socket.io-client';

export const socket: SocketIOClient.Socket = io('http://localhost:3002');