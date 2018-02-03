'use strict';

const Controller = require('egg').Controller;

class ChatController extends Controller {
  async send(ctx) {
    const msg = ctx.args[0];
    ctx.socket.broadcast.emit('send', msg);
  }
}

module.exports = ChatController;
