function create_last_angles_array(angle,direc,length_array){

var temp_array = [];

if (direc=='r' ) {

for (s = 0;s<length_array;s++) {

if (angle<-90) {

angle1 = (-1)*angle - 180;

}else {angle1 = angle;}

temp_array.push(circumA2circumB(angle1));

angle--;

}

}else if (direc=='l') {
	
for (s = 0;s<length_array;s++) {

if (angle>90) {

angle1 = 180 - angle;
}else {angle1 = angle;}

temp_array.push(circumA2circumB(angle1)	);

angle++;
}
}



return temp_array;

}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}	

function circumA2circumB(a) {
var f;
if (a>=0) {
	f = a;
}
else {

f = 360+a;

}

	return f;
}


function circumB2circumA(a) {
var f;
if (a>=0 && a<=90) {
	f = a;
}
else {

f = a-360;
//console.log(f);

}


	return f;
}

function draw_basic_lines(id, vl){

//id: id del canvas
//x, y: centro de la circunferencia
//w, h: ancho y alto del rectángulo.
//vl --> .min angulo menor  (convencion 0 norte, 90 este, 180 sur, 270 oeste)
//vl.max --> angulo mayor
//radius: radio de la circunferencia.
//largo pata: largo del indicador del grado
// largo texto: distancia de los números al arco.
// deltax: corrección horizontal de los números negativos 

	//var angledelta = vl.angle;
	
x = vl.x_circum;
y = vl.y_circum;
w = vl.w_square;
h = vl.h_square;
radius = vl.radius_circum;
largopata = vl.largo_pata;
largotexto = vl.largo_texto;
deltax = vl.delta_negativos;
resolucion = vl.resolucion;



	
	var startAngleDeg = vl.min;
	
	var endAngleDeg = vl.max;
	
	//var startAngleDeg = 315;
	//var endAngleDeg = 45;
	

	var context = id;


	
	
   //var context = canvas.getContext('2d');
   context.beginPath();
	context.rect(0, 0, w, h);
	context.fillStyle = "black";
	context.fill();
   

	var a;
	var b;
   var a1;
   var b1;
   var a2;
   var b2;


   var alfarad;
   var alfadeg;

   startAngleDegR = startAngleDeg - 90;
   if (startAngleDegR < 0){startAngleDegR = 360 + startAngleDegR;}
   endAngleDegR = endAngleDeg - 90;
   if (endAngleDegR < 0){endAngleDegR = 360 + endAngleDegR;}
   var centerAngleDeg = (endAngleDegR + startAngleDegR)/2;
   if (centerAngleDeg*2 < 360){centerAngleDeg = 360 - 2*centerAngleDeg;}



   var startAngle = startAngleDegR * ( Math.PI / 180 );
   var endAngle = endAngleDegR * ( Math.PI / 180 );

      
      
	//context.clearRect(0, 0, w, h);
	
   context.beginPath();
   context.arc(x, y, radius, startAngle, endAngle, false);
   //context.arc(0, 0, 1000, 200, 300, false);
   context.lineWidth = 2;
       
   context.font = "10px Arial";

	
	//dibujo las líneas de los palitos negativos.


	var startAngleDegD = startAngleDeg;	
	var endAngleDegD = endAngleDeg;
	if (endAngleDegD < startAngleDegD) {endAngleDegD = endAngleDegD + 360;}



	for(alfadeg = startAngleDegD;alfadeg<=endAngleDegD;alfadeg = alfadeg + resolucion){

       alfarad = alfadeg * (Math.PI/180);

//        b = y - Math.abs(radius * Math.sin(alfarad));
//			a = x - Math.abs(radius * Math.cos(alfarad));

			b = y - radius * Math.cos(alfarad);
			a = x + radius * Math.sin(alfarad);
		

			
			b1 = b - largopata * Math.cos(alfarad);
			a1 = a + largopata * Math.sin(alfarad);
				
			b2 = b - largotexto * Math.cos(alfarad);
			a2 = a + largotexto * Math.sin(alfarad);
     
      context.moveTo(x, y);
      context.lineTo(a1, b1);

		      
      
      
      var alfadeg1t = alfadeg;
      if (alfadeg1t => 360) {alfadeg1t = 360 - alfadeg;}
      if (alfadeg1t < 360) {alfadeg1t = alfadeg - 360;}
      context.fillStyle = '#00FF00';
      context.fillText(alfadeg1t,a2-deltax,b2-2);
	}
	
	context.strokeStyle = rgbToHex(0,255,0);
	context.stroke();
	
	

}



function draw_variable_lines(id,stream,vl)
	
	{
		
	last_angles_array = create_last_angles_array(circumB2circumA(angle),direc,4);
		
	//console.log(angle);			
	//console.log(last_angles_array);
				
   var ctx = id;				
				
		ctx.beginPath();

		var kk = 255;
		var dd = 0.3;
     var  alfaradf = angle * (Math.PI/180);
     var af;
     var bf;
     var a1f;
     var b1f;
     
//console.log(alfaradf);

			bf = vl.y_circum - vl.radius_circum * Math.cos(alfaradf);
			af = vl.x_circum + vl.radius_circum * Math.sin(alfaradf);
					
			//console.log(af)					
					
			b1f = bf - Math.cos(alfaradf);
			a1f = af + Math.sin(alfaradf);
				     
      ctx.moveTo(vl.x_circum, vl.y_circum);
      ctx.lineTo(a1f, b1f);

		ctx.strokeStyle = rgbToHex(0,0,0);
		ctx.stroke();

		
      ctx.lineTo(a1f, b1f);

		ctx.strokeStyle = rgbToHex(0,255,0);
		ctx.stroke();
		
		
		//ctx.fillStyle = 'black';
    //ctx.fillRect(0, 0, 300, 150);

		//	ctx.font="20px Arial";
	//ctx.fillStyle = 'white';

	//ctx.fillText('Angle: '+circumB2circumA(angle),10,20);
	//ctx.fillText('Direction: '+direc,10,40);	
	//ctx.fillText('Value: '+valor,10,60);	
		
	}