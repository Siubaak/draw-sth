module.exports = app => {
  return async function draw() {
    const msg = this.args[0];
    console.log(msg)
    this.socket.emit('draw', msg);
  };
};

'use strict';

const Controller = require('egg').Controller;

class CanvasController extends Controller {
  async now(ctx) {
    const msg = ctx.args[0];
    ctx.socket.broadcast.emit('now', msg);
  }
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
