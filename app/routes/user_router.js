// app/routes/user_routes.js
// Routes to manipulate Users

var Point = require('../models/Point.js');
var User = require('../models/User.js');
// Routes that begin with '/users
// ---------------------------------------------------------------------------
module.exports = function(router, auth) {
    router.use(auth); 
    router.route('/users')

      // Get all of the users
      .get(function(req, res) {
          User.find(function(err, users) {
              if (err)
                  res.send(err);
              res.json(users);
          });
      })

      // Create a new user
      .post(function(req, res) {
          new User({
              username      : req.body.username,
              password      : req.body.password,
              phoneNumber   : req.body.phoneNumber
          }).save( function(err) {
              if (err)
                  res.send(err);
              res.json({ message : 'User created' });
          });
      });

    // Route that end in /points/:user_id
    // -------------------------------------------------------------------------------
    router.route('/points/userId/:user_id')

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
                 _userId : req.params.user_id,
             }, function(err, point) {
                 if (err)
                     res.send(err);

                 res.json({ message: 'Successfully deleted points' });
             });
        });


    // Routes that end /points/userId/:user_id/:type
    router.route('/points/userId/:user_id/:type')

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
                 _userId : req.params.user_id,
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
                user.username    = req.body.username;
                user.password    = req.body.password;
                user.phoneNumber = req.body.phoneNumber;
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
             });

             // Remove the corresponding points
             Point.remove({ _userId: req.params.user_id}, function(err, point) {
                 if (err)
                     res.send(err);

                 res.json({ message: 'Successfully deleted user and users points' });
            });
        });
  
};
