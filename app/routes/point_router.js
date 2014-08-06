// app/routes/point_routes.js
// Routes to manipulate points

var Point = require('../models/Point.js');

// Routes that end in /points
// --------------------------------------------------------------------------------
module.exports = function(router) {
    router.route('/points')

      // Get all of the points
      .get(function(req, res) {
          Point.find(function(err, points) {
              if (err)
                  res.send(err);
              res.json(points);
          });
      })

      // Create a new point
      .post(function(req, res) {
          new Point({
              type          : req.body.type,
              _userId       : req.body.user_id,
              unit          : req.body.unit,
              data          : req.body.data
          }).save( function(err) {
              if (err)
                  res.send(err);
              res.json({ message : 'Point created' });
          });
      });

    // Routes that in end /points/:point_id
    // --------------------------------------------------------------------------------
    router.route('/points/:point_id')

        // Get the point with the provided id
        .get(function(req, res) {
            Point.findById(req.params.point_id, function(err, point) {
                if (err)
                    res.send(err);
                res.json(point);
            });
        })

        // Update the point with this id
        .put(function(req, res) {
            Point.findById(req.params.point_id, function(err, point) {
                if (err)
                    res.send(err);

                Point.update({_id: req.params.point_id}, req.body.update, req.body.options, function(err, point) {
                    if (err)
                        res.send(err);
                });

                // save the point
                point.save(function(err) {
                    if (err)
                        res.send(err);

                    res.json({ message: 'Point updated' });
                });
            });
         })

         // Delete the point with this id
         .delete(function(req, res) {
             Point.remove({
                 _id: req.params.point_id
             }, function(err, point) {
                 if (err)
                     res.send(err);

                 res.json({ message: 'Successfully deleted point' });
             });
        });
};
