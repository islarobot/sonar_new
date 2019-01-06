///https://www.npmjs.com/package/virtual-serialport



var arduino_functions = require('./arduino_functions.js');

//// MODO DEVELOPMENT !!!!11

process.env.NODE_ENV = 'development';

var SerialPort = require('serialport');

if (process.env.NODE_ENV == 'development') {
  SerialPort = require('virtual-serialport');
}
 
var sp = new SerialPort('/dev/ttyUSB0', { baudRate: 57600 }); // still works if NODE_ENV is set to development!
 
sp.on('open', function (err) {
 
 // DE ARDUINO A PC ---------
 
  sp.on("data", function(data) {
    console.log("lo que recibo desde Ardu: " + data);
  });
 
 

 
  if (process.env.NODE_ENV == 'development') {
  	
  	/// CUANDO RECIBO EN ARDU DESDE PC
  	
    sp.on("dataToDevice", function(data) {
    	
    	console.log('lo que recibo en Ardu: '+data)

    	//data es el input del pc al arduino
    	
    	//aqui va la funcion que simula lo que haria el arduino. en base al input, devuelve un valor (funcion del grado)
    	
    	var data_sent = arduino_functions.generate_amplitude_function(data);
    	
    	console.log('lo que envio desde Ardu: '+data_sent)
    	
      sp.writeToComputer(data_sent);
    });
  }
 
 
//envio data del pc al arduino:
		
//aqui escucho un evento que viene del servidor http y escribo al arduino. como lo hago? ni puta idea. 
 
//  sp.write(0); // "From Arduino: BLOOP BLOOP!"


    sp.write('test');


});



//// cliente ipc

  var ipc=require('node-ipc');
 
    ipc.config.id   = 'hello';
    ipc.config.retry= 1500;
 
    ipc.connectTo(
        'world',
        function(){
            ipc.of.world.on(
                'connect',
                function(){
                    ipc.log('## connected to world ##'.rainbow, ipc.config.delay);
                    ipc.of.world.emit(
                        'message',  //any event or message type your server listens for
                        'hello'
                    )
                }
            );
            ipc.of.world.on(
                'disconnect',
                function(){
                    ipc.log('disconnected from world'.notice);
                }
            );
            ipc.of.world.on(
                'message',  //any event or message type your server listens for
                function(data){
                    ipc.log('got a message from world : '.debug, data);
                }
            );
        }
    );



