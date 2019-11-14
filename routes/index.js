var express = require('express');
var router = express.Router();
var path = require("path");

// this is actually /led
router.get('/led', function (req, res, next) {
   
    // Process the view
    res.sendFile(path.join(__dirname , '../public/index/led.html'));

    // Sorta works like a service
    var io = req.app.get('socketio');
    var led = req.app.get('led');
     
    // Socket connection handler
    io.on('connection', function (socket) {  
        socket.emit('news', { message: "Connection Made" });
        console.log("socket : " + socket.id);
            
        // LED ON
        socket.on('led:on', function (data) {
            led.on();
            console.log('LED ON');
        });
     
        // LED OFF
        socket.on('led:off', function (data) {
            led.off();
            console.log('LED OFF');
        });
    });
    
})

router.use('/example', require('./example'));

// Make assets public
router.use("/public", express.static(path.join(__dirname , '../public')));

module.exports = router;