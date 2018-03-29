import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ChatsGateway } from 'chats/chats.gateway';
import { CanvasesGateway } from 'canvases/canvases.gateway';

@Module({
  imports: [],
  controllers: [ AppController ],
  components: [ CanvasesGateway, ChatsGateway ],
})
export class AppModule {}
