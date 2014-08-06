// app/models/point.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PointSchema = new Schema({
  type: String,
  timeStamp: { type: Date, default: Date.now },
  _userId: Schema.Types.ObjectId,
  unit: String,
  data: Number
});

PointSchema.method.findByUserId = function(userId, cb) {
    return this.find({userId : userId}, cb);
}

PointSchema.method.findByUserIdAndType = function(userId, type, cb) {
    return this.find({ userId : userId, type : type }, cb);
}

module.exports = mongoose.model('Point', PointSchema);
