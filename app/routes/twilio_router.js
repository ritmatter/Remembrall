var Point = require('../models/Point.js');
var twilio = require('twilio');
var client = new twilio.RestClient();
var resp = new twilio.TwimlResponse();

var TWILIO_NUMBER = '+1 908 389 6792';
var myNumber = '+1 908 917 2739';

//curl -X POST -v -d "From=<NUMBER>&Body=<MESSAGE_CONTENT>" http://127.0.0.1:8080/api/incoming
// If it doesn't work, try turning off your firewall
module.exports = function(router) {
    router.route('/incoming')
        .post(function(req, res) {
            var message = req.body.Body;
            var from = req.body.From;

            var type = message.split(" ")[0];
            var data = message.split(" ")[1];
            var unit = message.split(" ")[2];
            var userId = User.find({
                phoneNumber : from,
            }, function(err, user) {
                if (err)
                    res.send(err);
            });

            new Point({
                type          : type,
                time_stamp    : Date.now(),
                user_id       : '1993',
                unit          : unit,
                data          : data
            }).save( function(err) {
                if (err)
                    res.send(err);
                res.json({ message : 'Point created' });
            });

            client.sms.messages.post({
                to: from,
                from: TWILIO_NUMBER,
                body: 'Received message: ' + message
            }, function(err, message) {
                if (!err) {
                    console.log('Success! The SID for this SMS message is:');
                    console.log(message.sid);
                    console.log('Message sent on:');
                    console.log(message.dateCreated);
                } else {
                    console.log(error);
                    console.log('Oops! There was an error.');
                }
            });
        });
};
