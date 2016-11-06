/*
 * Connect all of your endpoints together here.
 */
var Place = require('./place.js');
module.exports = function (app, router) {
  // app.use('/api', require('./home.js')(router));
  // app.use('/api', require('./place.js')(router));
  app.post('/api/Place/get', Place.getPlaces)
};
