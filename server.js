
//https://stackabuse.com/node-js-websocket-examples-with-socket-io/

var app = require('express')();  
var server = require('http').Server(app);  
var io = require('socket.io')(server);
var ipc=require('node-ipc');


var global_socket;
 
ipc.config.id   = 'world';
ipc.config.retry= 1500;


app.get('/', function(req, res) {  
    res.sendFile(__dirname + '/index.html');
});

server.listen(8080);


io.on('connection', function(socket) {  
    socket.emit('announcements', { message: 'A new user has joined!' });

    socket.on('event', function(data) {
        ///console.log('html client: ', data.message);
        
        ipc.server.emit(global_socket,'message','222');
        
        
        
    });
});



ipc.serve();

ipc.server.start();

ipc.server.on('start',function(){console.log('start');});

ipc.server.on('connect',function(socket){
	
ipc.server.emit(socket,'message','111');

global_socket = socket;

});




    
    
    
    