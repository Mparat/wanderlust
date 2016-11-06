module.exports = function(router) {

  var homeRoute = router.route('/');

  homeRoute.get(function(req, res) {
    // connectionString = secrets.token;
    // res.json({ message: 'My connection string is ' + connectionString });
    res.send({message : 'hey'})
  });

  return router;
}
