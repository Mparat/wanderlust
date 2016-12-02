const MongoClient = require('mongodb').MongoClient
// var db
// MongoClient.connect('mongodb://admin:mparat2@ds143707.mlab.com:43707/travel_agent', function(err, database) {
//   if (err) return console.log(err)
//   db = database
// })
var User = require('../models/user');
var mongoose = require('mongoose');
var db = mongoose.connection;

module.exports = {
  addUser: function(req, res) {
    var facebookId = req.body.facebookId;
    var name = req.body.name;
    var locations = req.body.locations;
    var user = new User({
      facebookId: facebookId,
      name: name,
      locations: locations
    });
    console.log('new user:', user);
    User.find({facebookId: facebookId}, function(err, result) {
      if (err) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(500).send({message: "User not found", data: []});
      }
      else {
        if (result.length == 0) {
          user.save(function(err, result) {
            if (err) {
              res.setHeader('Content-Type', 'application/json');
              return res.status(500).send({message: "User not added", data: []});
            }
            else {
              res.setHeader('Content-Type', 'application/json');
              return res.status(201).send({message: "User added", data: result});
            }
          });
        }
        else {
          return res.status(201).send({message: "This User already exists", data: result});
        }
      }
    });
  },

  updateUser: function(req, res) {
    var id = req.body.id;
    var facebookId = req.body.facebookId;
    var locations = req.body.locations;
    var name = req.body.name;
    User.findByIdAndUpdate(id, {$set:{'locations':locations}}, { new: true }, function(err, result) {
      if (err) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(404).send({message: "User not updated", data: []});
      }
      else {
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).send({message: "User updated", data: result});
      }
    });
  },

  getUser: function(req, res) {
    var facebookId = req.body.facebookId;
    User.find({facebookId: facebookId}, function(err, result) {
      if (err) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(500).send({message: "User not found", data: []});
      }
      else {
        if (!result) {
          return res.status(404).send({message: "User Not Found", data: []});
        }
        else {
          return res.status(200).send({message: "User found", data: result});
        }
      }
    });
  }
};
