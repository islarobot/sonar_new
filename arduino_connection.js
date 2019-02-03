//https://www.tigoe.com/pcomp/code/arduinowiring/1161/

var args = process.argv.slice(2);

//console.log(args)

var port_string = '/dev/ttyACM'+args[0];

//console.log(port_string)

var SerialPort = require('serialport');

var initial_angle = 0;
var direction = 'r';
var increase = 3;


var serialPort = new SerialPort(port_string, {
    baudRate: 9600
});

serialPort.on('data', function (data) {	   console.log('Data:', data.toString());});



setInterval(
	function () {
		//console.log(initial_angle.toString())
	serialPort.write(initial_angle.toString()+'\n');
	if (direction == 'r') {	initial_angle = initial_angle + increase;
	}else {
		initial_angle = initial_angle - increase;}
	if (initial_angle > 170) {direction  = 'l';	}
	if (initial_angle < 0) {direction  = 'r';	}
	
	}
, 100);



