var arduino_functions = require('./arduino_functions.js');


process.env.NODE_ENV = 'development';

var SerialPort = require('serialport');
if (process.env.NODE_ENV == 'development') {
  SerialPort = require('virtual-serialport');
}
 
var sp = new SerialPort('/dev/ttyUSB0', { baudRate: 57600 }); // still works if NODE_ENV is set to development!
 
sp.on('open', function (err) {
 
 //cuando se envia info al pc
 
  sp.on("data", function(data) {
    console.log("lo que recibo desde Ardu: " + data);
  });
 
 

 
  if (process.env.NODE_ENV == 'development') {
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


    sp.write(data);


});