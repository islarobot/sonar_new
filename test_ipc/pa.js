/// pa.js


var ipc=require('node-ipc');
 
ipc.config.id   = 'world';
ipc.config.retry= 1500;

ipc.serve(function () {

ipc.server.on('socket.connect',console.log('conectado'));

}
);

//ipc.server.start();

//ipc.server.on('message',console.log('pepe'));

//ipc.server.emit();

//ipc.server.on('socket.connect',console.log('conectado'));