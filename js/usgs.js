var $ = require("jquery");
//create object
Usgs = function(){
    
};


  //writeRequest turns the getCurrentPosition object into a string in the request
Usgs.prototype.writeRequest=function(state){
    
    var request = {
      format: "json",
      stateCd: state,
      period: "P5D",
      parameterCD: "00060",
      siteType: "ST",
      siteStatus: "active",
      //csurl: 'http://waterservices.usgs.gov/nwis/dv/'
    };
    return request;
};


  //sendRequest sends the request written by writeRequest
  //will need to be called from controller
Usgs.prototype.goTalk=function(state){
    return $.ajax({
      //url: 'https://www.gmtatennis.org/kp/proxy.php',
      url: 'https://waterservices.usgs.gov/nwis/dv/',
      format: "json",
      data: this.writeRequest(state), 
      type: "GET"
    });
     
};

module.exports = Usgs;

