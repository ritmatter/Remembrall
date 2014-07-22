// app/api.js
// server routes ==================================================================
// handle things like api calls
// authentication routes
var Point = require('../models/Point.js');
var User = require('../models/User.js');

module.exports.create_point = function(router) {
    router.route('/create_point')
      .get(function(req, res) {
          new Point({
              type          : req.body.type,
              time_stamp    : Date.now(),
              user_id       : req.body.user_id,
              unit          : req.body.unit,
              data          : req.body.data
          }).save( function( err, point, count ) {
              if ( err ) return next( err );
          });
    });
};

// sample api route
module.exports = function(router) {
  router.route('/points')
    .get(function(req, res) {
      // use mongoose to get all Points in the database
      Point.find(function(err, points) {
        // if there is an error retrieving, send the error, nothing after res.send will execute
        if (err) {
          res.send(err);
        }
        res.json(points);
      });
    });
};
