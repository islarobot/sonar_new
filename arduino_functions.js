//arduino functions


module.exports = {
  generate_amplitude_function: function (degree) {
    
    
  var rad = degree*3.1416/180
  
  return 10*Math.sin(rad).toFixed(2)+10;
    
  },

};