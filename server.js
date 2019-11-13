const express = require('express');  
const app = express();  
const httpServer = require("http").createServer(app);  
const five = require("johnny-five");
const Raspi = require("raspi-io").RaspiIO;
const io = require('socket.io')(httpServer);

app.use('/', require('./routes'));

let led;

let board = new five.Board({
    io: new Raspi()
});

board.on("ready", function() {  
    console.log('Pi connected');

    // Define robotic pins here
    led = new five.Led("P1-16");

    // socketio required 
    app.set('socketio', io);

    // Set the pins here to use them in the routes
    app.set('led', led);

    httpServer.listen(8000, function () {
        console.log('Server is running');
    })
});


board.on("exit", function() {  
    console.log('Pi disconnected');
    led.off();
});