
//https://stackabuse.com/node-js-websocket-examples-with-socket-io/

var app = require('express')();  
var server = require('http').Server(app);  
var io = require('socket.io')(server);
var ipc=require('node-ipc');

ipc.config.id   = 'world';
ipc.config.retry= 1500;


 
ipc.serve(function(){
		ipc.server.on(
			'message',
				function(data,socket){
					ipc.log('got a message : '.debug, data);
					//	ipc.server.emit(socket,'message',data+' world!');
						}
					);
				ipc.server.on('socket.disconnected',function(socket, destroyedSocketID) {
						ipc.log('client ' + destroyedSocketID + ' has disconnected!');
					}
				);
			}
	);
 
ipc.server.start();



app.get('/', function(req, res) {  
    res.sendFile(__dirname + '/index.html');
});

server.listen(8080);


io.on('connection', function(socket) {  
    socket.emit('announcements', { message: 'A new user has joined!' });

    socket.on('event', function(data) {
        console.log('html client: ', data.message);
        
        ipc.server.emit(socket,'message',data.message)
        
        
    });
});



/////Server node-ipc





    
    
    
    