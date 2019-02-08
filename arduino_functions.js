//arduino functions


module.exports = {
  generate_amplitude_function: function (datos) {
    
var param = datos.substr(0,2);

var larg = datos.length-1;
var prim = datos.indexOf('_');
var seg = datos.indexOf('_',prim+1);
var ter = datos.indexOf('_',seg+1);

var angulo = datos.substr(prim+1,seg-prim-1);
var direccion = datos.substr(seg+1,ter-seg-1);

 var rad = angulo*3.1416/180
  
 var value = Math.abs(50*Math.sin(rad).toFixed(2));
 
 return param+'_'+angulo+'_'+direccion+'_'+value+'_\n';
    
  },




funcion_conversion_node_ardu: function(data)
{

data_object = JSON.parse(data);

//console.log("ssss")
//console.log(data_object.inputAngle)

var output;

output = data_object.inputParam+'_'+data_object.inputAngle+'_'+data_object.inputDirection+'_\n'


	


return output;

},





funcion_conversion_ardu_node: function(datos)
{

var param = datos.substr(0,2);

var larg = datos.length-1;
var prim = datos.indexOf('_');
var seg = datos.indexOf('_',prim+1);
var ter = datos.indexOf('_',seg+1);
var cuar = datos.indexOf('_',ter+1);

var angulo = datos.substr(prim+1,seg-prim-1);
var ang_int = parseInt(angulo);

var direccion = datos.substr(seg+1,ter-seg-1);
var valor = datos.substr(ter+1,cuar-ter-1);

var output = {inputParam:param,inputAngle:angulo,inputDirection:direccion,outputValue:valor};

var output_JSON = JSON.stringify(output);
if (isNaN(ang_int)) {
	
var output_JSON = 'NA';
}


return output_JSON;

}

};

