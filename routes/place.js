const MongoClient = require('mongodb').MongoClient
// var db
// MongoClient.connect('mongodb://admin:mparat2@ds143707.mlab.com:43707/travel_agent', function(err, database) {
//   if (err) return console.log(err)
//   db = database
// })
var mongoose = require('mongoose');
var db = mongoose.connection;

module.exports = {
  // var placeRoute = router.route('/place/:query');
  // Returns image links from database based on search query being in city_name, or country_name.
  getPlaces: function(req, res) {
  // console.log(placeRoute);
  // placeRoute.get(function(req, res) {
  	var query = req.body.query;
    var regex = new RegExp(query, "i");
    db.collection('posts').find({"$or": [{"city_name" : regex}, {"country_name" : regex}, {"city_name" : {"$in": [regex]}}, {"country_name" : {"$in": [regex]}}]}).toArray(function(err, result) {
      if (err) {
        console.log(err);
        return res.status(400).send({message: "Place Not Found", data: {}});
      }
      else {
        // console.log('hi');
        // console.log(result);
        return res.status(200).json({message: "Place Found", data: result});
      }
    });
  }
  // });
  // return router;
};
