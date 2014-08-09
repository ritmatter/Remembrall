module.exports = function(router, auth, passport) {
  router.route('/loggedin').get(function(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
  });

  router.post('/login', passport.authenticate('local'), function(req, res) {
    res.send(user);
  });

  router.post('/logout', function(req, res) {
    req.logOut();
    res.send(200);
  });
};
