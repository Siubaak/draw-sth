import { WebSocketGateway, SubscribeMessage } from '@nestjs/websockets';
import config from '../../config';

@WebSocketGateway({ port: config.wsPort })
export class ChatsGateway {
    @SubscribeMessage('send')
    onSend(client, data) {
        client.broadcast.emit('send', data);
    }
}