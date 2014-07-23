// app/models/point.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PointSchema = new Schema({
  type: String,
  timeStamp: Date,
  userId: Number,
  unit: String,
  data: Number
});

module.exports = mongoose.model('Point', PointSchema);
