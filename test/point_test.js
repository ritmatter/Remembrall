process.env.NODE_ENV = 'test';

var mongoose = require('mongoose');
var request = require('supertest');
var Points = require('../app/models/Point.js');
var app = require('../server.js');


describe('Routes: Points', function(done) {
  beforeEach(function (done) {
    for (var i = 0; i < mongoose.connection.collections.length; i++) {
      collection = mongoose.connection.collections[i];
      collection.remove()
    }
    return done();
  });

  it('should return an empty array', function (done) {
    request(app)
    .get('/api/points')
    .expect('Content-Type', /json/)
    .expect(200, done)
    .expect([]);
  });

//  it('should let us add a point', function (done) {
//    request(app)
//    .post('/api/points/')
//    .type('json')
//    .send({ "type": 'Test', "_userId": 'fdsa', "unit": 'Test', "data": 10 })
//    .end(function(err, res) {
//      if (err) { throw err; }
//      res.should.equal("Foo");
//      return done();
//    });
  });
});

