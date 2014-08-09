// A category model
// Category holds a list of point types for a given user


var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CategorySchema = new Schema({
    name        : String,
    timeStamp   : { type: Date, default: Date.now },
    _userId     : { type: Schema.Types.ObjectId, required: true },
    types       : [String]
});

CategorySchema.method.findByUserId = function(userId, cb) {
    return this.find({ _userId : userId }, cb);
};

module.exports = mongoose.model('Category', CategorySchema);
