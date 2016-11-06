// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var PlaceSchema   = new mongoose.Schema({
  city_name: String,
  country_name: String,
  images : {}
});

// Export the Mongoose model
module.exports = mongoose.model('Place', PlaceSchema);
