var Place = require('../models/place');
var mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient

var db
MongoClient.connect('mongodb://admin:mparat2@ds143707.mlab.com:43707/travel_agent', function(err, database) {
  if (err) return console.log(err)
  db = database
})

module.exports = {
  getPlaces: function(req, res) {
  	var query = req.body.query;
    var regex = new RegExp(["^", query, "$"].join(""), "i");
    // db.collection('posts').find({"city_name" : "Oslo"}).toArray(function(err, result) {
     db.collection('posts').find({"$or" :[{"city_name" : regex},{"country_name" : regex}]}).toArray(function(err, result) {
      if (err) {
        console.log(err);
        return res.status(400).send({message: "Place Not Found", data: {}});
      }
      else {
        // console.log(result);
        return res.status(200).json({message: "Place Found", data: result});
      }
    });
  }
};
