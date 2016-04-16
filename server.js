/*
    UNT Robotics
    BB-8 Head

    Main
*/

const BLUETOOTH_PORT = 'COM4';
const CLIENT_PORT = 80;

//includes
var app = require('express')();
var http = require('http').Server(app);
var jf = require('johnny-five');

//initialize http server
http.listen(CLIENT_PORT, function() {
    console.log('UNT Robotics');
    console.log('BB-8');
    console.log('--------------');
    console.log('Started server running on port ' + CLIENT_PORT);
});

//initialize board
var board = new jf.Board({ "port": BLUETOOTH_PORT });

//on board connection
board.on('ready', function() {
    console.log('Connected to body controller');

    var servo = new five.Servo({
        pin: 11,
        startAt: 90
    });
    var lap = 0;

    servo.sweep().on("sweep:full", function() {
        console.log("lap", ++lap);

        if (lap === 1) {
            this.sweep({
                range: [40, 140],
                step: 10
            });
        }

        if (lap === 2) {
            this.sweep({
                range: [60, 120],
                step: 5
            });
        }

        if (lap === 3) {
            this.sweep({
                range: [80, 100],
                step: 1
            });
        }

        if (lap === 5) {
            process.exit(0);
        }
    });
});