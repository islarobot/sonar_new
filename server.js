
//https://stackabuse.com/node-js-websocket-examples-with-socket-io/

var app = require('express')();  
var server = require('http').Server(app);  
var io = require('socket.io')(server);
var ipc=require('node-ipc');



app.get('/', function(req, res) {  
    res.sendFile(__dirname + '/index.html');
});

server.listen(8080);


io.on('connection', function(socket) {  
    socket.emit('announcements', { message: 'A new user has joined!' });

    socket.on('event', function(data) {
        console.log('html client: ', data.message);
        
        
        
        
    });
});








    
    
    
    