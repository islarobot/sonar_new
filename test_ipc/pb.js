//pb.js


var ipc=require('node-ipc');
 
ipc.config.id   = 'hello';
ipc.config.retry= 1500;
 
ipc.connectTo('world');


ipc.of.world.on('message'console.log('mmm'));