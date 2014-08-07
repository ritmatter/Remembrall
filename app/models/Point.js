// app/models/point.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PointSchema = new Schema({
  type: String,
  timeStamp: { type: Date, default: Date.now },
  _userId: { type: Schema.Types.ObjectId, required : true },
  unit: String,
  data: Number
});

PointSchema.statics.findByUserId = function(userId, cb) {
    return this.find({_userId : userId}, cb);
};

PointSchema.statics.findByUserIdAndType = function(userId, type, cb) {
    return this.find({_userId : userId, type : type }, cb);
};

module.exports = mongoose.model('Point', PointSchema);
