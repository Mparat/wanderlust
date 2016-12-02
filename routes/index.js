/*
 * Connect all of your endpoints together here.
 */
var Place = require('./place.js');
var User = require('./user.js');
module.exports = function (app, router) {
  // app.use('/api', require('./home.js')(router));
  // app.use('/api', require('./place.js')(router));
  app.post('/api/Place/get', Place.getPlaces),
  app.post('/api/User/post', User.addUser),
  app.post('/api/User/get', User.getUser),
  app.post('/api/User/update', User.updateUser)
};
