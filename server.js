// server.js

// modules
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();
// configuration
var db = require('./config/db');

var port = process.env.PORT || 8080; // set up our port
mongoose.connect(db.url) // connect to mongo database instance. Uncomment this once you actually
// get a mongo database instance set up for this project

// get all data / stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header
// in the request, simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be the /img for users

// routes
// ==================================================
var dataRouter = express.Router();
var frontendRouter = express.Router();
twilio_router = require('./app/routes/twilio_router.js')(dataRouter); // configure our routes
point_router = require('./app/routes/point_router.js')(dataRouter);
user_router = require('./app/routes/user_router.js')(dataRouter);

// start app ========================================
frontendRouter.get('*', function(req, res) {
  res.sendfile('./public/index.html'); // load our public/index.html file (going to be used for templates)
});
app.listen(port); // startup our app at http://localhost:8080
console.log('Magic happens at port ' + port); // shoutout to the user!
app.use('/api', dataRouter);
app.use('/', frontendRouter);
