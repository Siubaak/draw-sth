'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  app.io.route('start', app.io.controller.canvas.start);
  app.io.route('draw', app.io.controller.canvas.draw);
};
