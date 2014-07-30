// app/routes/user_routes.js
// Routes to manipulate Users

var Point = require('../models/Point.js');
var User = require('../models/User.js');
// Routes that beinng with '/users
// ---------------------------------------------------------------------------
module.exports = function(router) {
    router.route('/users')

      // Get all of the userss
      .get(function(req, res) {
          User.find(function(err, users) {
              if (err)
                  res.send(err);
              res.json(users);
          });
      })

      // Create a new point
      .post(function(req, res) {
          new User({
              username      : req.body.type,
              time_stamp    : Date.now(),
              password      : req.body.user_id,
              phoneNumber   : req.body.phoneNumber
          }).save( function(err) {
              if (err)
                  res.send(err);
              res.json({ message : 'User created' });
          });
      });

    // Route that end in /points/:user_id
    // -------------------------------------------------------------------------------
    router.route('/points/:user_id')

        // Get all the points for the given user_id
        .get(function(req, res) {
            Point.findByUserId(req.params.user_id, function(err, point) {
                if (err)
                    res.send(err);
                res.json(point);
            });
        })

        // Delete the points with this id
        .delete(function(req, res) {
             Point.remove({
                 _id: req.params.point_id,
                 userId : req.params.user_id,
             }, function(err, point) {
                 if (err)
                     res.send(err);

                 res.json({ message: 'Successfully deleted points' });
             });
        });


    // Routes that end /points/:user_id/:type
    router.route('/points/:user_id/:type')

        // Get all the points for a given type for a given user
        .get(function(req, res) {
            Point.findByUserIdAndType(req.params.user_id, req.params.type, function(err, point) {
                if (err)
                    res.send(err);
                res.json(point);
            });
        })

        // Delete the points with this id and type
        .delete(function(req, res) {
             Point.remove({
                 _id: req.params.point_id,
                 userId : req.params.user_id,
                 type : req.params.type
             }, function(err, point) {
                 if (err)
                     res.send(err);

                 res.json({ message: 'Successfully deleted points' });
             });
        });


    // Routes that end in /users/:user_id
    // --------------------------------------------------------------------------------
    router.route('/users/:user_id')

        // Get the user with the provided id
        .get(function(req, res) {
            User.findById(req.params.user_id, function(err, user) {
                if (err)
                    res.send(err);
                res.json(user);
            });
        })

        // Update the user with this id
        .put(function(req, res) {
            User.findById(req.params.user_id, function(err, user) {
                if (err)
                    res.send(err);

                User.update({_id: req.params.user_id}, req.body.update, req.body.options, function(err, user) {
                    if (err)
                        res.send(err);
                });

                // save the user
                user.save(function(err) {
                    if (err)
                        res.send(err);

                    res.json({ message: 'User updated' });
                });
            });
         })

         // Delete the user with this id
         .delete(function(req, res) {

            // Remove the user
             User.remove({ _id: req.params.user_id }, function(err, user) {
                 if (err)
                     res.send(err);

                 res.json({ message: 'Successfully deleted user' });
             });

             // Remove the corresponding points
             Point.remove({ userId: req.params.user_id}, function(err, point) {
                 if (err)
                     res.send(err);

                 res.json({ message: 'Successfully deleted users points' });
            });
        });
};
