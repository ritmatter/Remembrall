var mongoose = require('mongoose');
var point = require('../../app/models/point');

mongoose.connect('mongodb://localhost/remembrall_test');
describe("Points", function() {
    //holds a point to use in each test
    var currentPoint = null;
    beforeEach(function(done) {
        //add some test data  
