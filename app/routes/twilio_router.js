var Point = require('../models/Point.js');
var User = require('../models/User.js');
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

            var input = message.split(" ");
            if (input.length != 3 || isNaN(input[1])) {
                response = "Sorry, we were unable to process that. Please make sure you enter <VERB> <MEASUREMENT> <UNIT>";
                sendText(from, message, response);
            } else {
                var type = input[0];
                var data = input[1];
                var unit = input[2];

                User.findOne({
                    phoneNumber : from,
                }, function(err, user) {
                    if (err) {
                        response = "Sorry, something went wrong. Please send your text again";
                        sendText(from, message, response);
                    }
                    else if (!user) {
                        response = "Hi there! We don't recognize your number. If you'd like to sign up, text us \"u:<USERNAME>, p:<PASSWORD>\"";
                        sendText(from, message, response);
                    } else {
                        new Point({
                            type          : type,
                            time_stamp    : Date.now(),
                            user_id       : user.userId,
                            unit          : unit,
                            data          : data
                        }).save( function(err) {
                            if (err)
                                res.send(err);
                            res.json({ message : 'Point created' });
                        });
                        response = "Successfully processed " + "\"" + message + "\"";
                        sendText(from, message, response);
                    }
                });
            }
       });
};

function sendText(from, message, response) {
    client.sms.messages.post({
        to: from,
        from: TWILIO_NUMBER,
        body: response
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
}
