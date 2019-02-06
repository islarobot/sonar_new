///https://www.npmjs.com/package/virtual-serialport

////REQUIRES
//https://www.tigoe.com/pcomp/code/arduinowiring/1161/

var args = process.argv.slice(2);

var port_string = '/dev/ttyACM'+args[0];

var ipc=require('node-ipc');
var arduino_functions = require('./arduino_functions.js'); 
 
//// CONFIGURACION IPC

 
ipc.config.id   = 'hello';
ipc.config.retry= 1500;
ipc.config.silent = true;

//// ME CONECTO A SERVER.JS

ipc.connectTo('world');

//var serialPort = new SerialPort(port_string, {    baudRate: 9600});

//// INICIALIZO CONEXION A ARDU A FALSE.

var arduino_connect = false;



//// MODO DEVELOPMENT !!!!11

process.env.NODE_ENV = 'development';
process.env.NODE_ENV = 'prod';

var SerialPort = require('serialport');

/// SI MODO DEVELOPMENT

if (process.env.NODE_ENV == 'development') {
  SerialPort = require('virtual-serialport');
}
 
var sp = new SerialPort(port_string, { baudRate: 57600 }); // still works if NODE_ENV is set to development!
 

////  CUANDO SE ABRE LA CONEXION CON ARDUINO
 
sp.on('open', function (err) {
 
   arduino_connect = true; 
 
 
 /// CUANDO RECIBO DATOS DE ARDU
 
sp.on("data", function(data) {
	

	
	data_string = data.toString();
		
	
	angle_string = data_string.substr(0,data_string.lastIndexOf("A"));
	value_string = data_string.substr(data_string.lastIndexOf("A")+1,data_string.lastIndexOf("V"));

	angle_int = parseInt(angle_string);
	value_int = parseInt(value_string);
	
	//console.log(angle_int);
	//console.log(value_int);
	


	if (!isNaN(angle_int)) {

			data_out_2 = arduino_functions.funcion_conversion_ardu_node(data_int,"data","A");
			ipc.of.world.emit('message',data_out_2);
			//console.log(data_out_2);
	}
	//data_string = data_string.toFixed(2);
	

  	 //console.log("---> 6 ---->  " + data_string);
    //console.log("---> 6 ---->  " + data_out_2);
    //ipc.of.world.emit('message',data_out_2);
               
});

});




///////  ------- 3 -----------  RECIBO INFO DE SERVER.JS Y LA REENVIO A ARDUINO TAL CUAL. AQUI NECESITO FUNCION DE CONVERSION.


ipc.of.world.on('message',function(data){

var data_out = JSON.parse(data).inputAngle+JSON.parse(data).direction;

console.log(data_out);

//var data_out = arduino_functions.funcion_conversion_node_ardu(data);



///////// Tengo que confirmar que hay conexion con arduino.

if(arduino_connect){
	
	
	//console.log('---> 3 --->'+data_out);
	sp.write(data_out.toString()+'\n');
	
	}


});


///////  ------- 4 / 5-----------  RECIBO INFO DE ARDU_CONNECTION.JS EN EL ARDUINO Y LA DEVUELVO A ARDU_CONECTION.JS. AQUI NECESITO FUNCION DE CONVERSION. --- ESTE CODIGO SE SUSTITUYE POR EL DE ARDU



  if (process.env.NODE_ENV == 'development') {
  	
  	/// CUANDO RECIBO EN ARDU DESDE PC
  	
    sp.on("dataToDevice", function(data) {
    	
    	console.log('-----> 4 -----> '+data);

    	//data es el input del pc al arduino
    	
    	//aqui va la funcion que simula lo que haria el arduino. en base al input, devuelve un valor (funcion del grado)
    	
    	var data_sent = arduino_functions.generate_amplitude_function(data);
    	
    	console.log('----> 5 ----> '+data_sent);
    	
      sp.writeToComputer(data_sent);
    });
  }










