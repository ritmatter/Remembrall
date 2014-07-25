var twilio = require('twilio');
var client = new twilio.RestClient('AC2e196fc0a7d4a9bfd78689dc3feb030f', '93b2c15b04ef67872ed5ab89c26044d7');

var TWILIO_NUMBER = '+1 908 389 6792';
var myNumber = '+1 908 917 2739';

client.sms.messages.create({
    to: myNumber,
    from: TWILIO_NUMBER,
    body:'ahoy hoy! Testing Twilio and node.js'
}, function(error, message) {
    // The HTTP request to Twilio will run asynchronously. This callback
    // function will be called when a response is received from Twilio
    // The "error" variable will contain error information, if any.
    // If the request was successful, this value will be "falsy"
    if (!error) {
        // The second argument to the callback will contain the information
        // sent back by Twilio for the request. In this case, it is the
        // information about the text messsage you just sent:
        console.log('Success! The SID for this SMS message is:');
        console.log(message.sid);
        console.log('Message sent on:');
        console.log(message.dateCreated);
    } else {
        console.log(error);
        console.log('Oops! There was an error.');
    }
});
