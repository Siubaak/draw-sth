'use strict';

const Controller = require('egg').Controller;

class CanvasController extends Controller {
  async start(ctx) {
    const msg = ctx.args[0];
    ctx.socket.broadcast.emit('start', msg);
  }
  async draw(ctx) {
    const msg = ctx.args[0];
    ctx.socket.broadcast.emit('draw', msg);
  }
}

module.exports = CanvasController;
