//arduino functions


module.exports = {
  generate_amplitude_function: function (degree) {
    
    
  var rad = degree*3.1416/180
  
  return 10*Math.sin(rad).toFixed(2)+10;
    
  },




funcion_conversion_node_ardu: function(data)
{

data_object = JSON.parse(data);

var output;

if (data_object.mode == 'data') {

output = data_object.value;
	
}

return output;

},





funcion_conversion_ardu_node: function(data,mode,type)
{

var output = {mode:mode,type:type,data:data};

var output_JSON = JSON.stringify(output);

return output_JSON;

}

};

