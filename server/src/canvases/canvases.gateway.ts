import { WebSocketGateway, SubscribeMessage } from '@nestjs/websockets';
import config from '../../config';

@WebSocketGateway({ port: config.wsPort })
export class CanvasesGateway {
    @SubscribeMessage('start')
    onStart(client, data) {
        client.broadcast.emit('start', data);
    }
    @SubscribeMessage('draw')
    onDraw(client, data) {
        client.broadcast.emit('draw', data);
    }
}