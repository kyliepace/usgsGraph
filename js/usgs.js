var $ = require("jquery");
//create object
Usgs = function(){
    
};


  //writeRequest turns the getCurrentPosition object into a string in the request
Usgs.prototype.writeRequest=function(position){
    var long=position.coords.longitude.toString().slice(0,11);
    var lat=position.coords.latitude.toString().slice(0,9);
    var longExt=(position.coords.longitude+1).toString().slice(0,11);
    var latExt=(position.coords.latitude+1).toString().slice(0,9);  
    var request = {
      format: "json",
      bBox: long+","+lat+","+longExt+","+latExt,
      period: "P5D",
      parameterCD: "00060",
      siteType: "ST",
      siteStatus: "active",
      csurl: 'http://waterservices.usgs.gov/nwis/iv/'
    };
    return request;
};


  //sendRequest sends the request written by writeRequest
  //will need to be called from controller
Usgs.prototype.goTalk=function(position){
    return $.ajax({
      url: 'https://www.gmtatennis.org/kp/proxy.php',
      format: "json",
      data: this.writeRequest(position), //don't send any params to usgs until writeRequest has formatted us some coords
      type: "GET"
    });
     
};

module.exports = Usgs;

