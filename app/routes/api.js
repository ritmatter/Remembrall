// app/api.js
// server routes ==================================================================
// handle things like api calls
// authentication routes
var Point = require('../models/Point.js');
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
