import * as io from 'socket.io-client';

export const socket: SocketIOClient.Socket = io('http://192.168.1.157:7001');