//create object
var usgs = function(){
    this.request={
      format: "json",
      bBox: "",
      period: "P5D",
      parameterCD: "00060",
      siteType:"ST",
      siteStatus: "active",
      csurl: 'http://waterservices.usgs.gov/nwis/iv/'
    }
};
//getLocation method will need to be called from controller
usgs.prototype.getLocation=function(){
    if (navigator.geolocation) {
      //return the geolocation object with writeRequest as a callback
      navigator.geolocation.getCurrentPosition(function(position){
          //callback writeRequest method
          usgs.prototype.writeRequest(position);
      });
    }
    else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
};
  //writeRequest turns the getCurrentPosition object into a string in the request
usgs.prototype.writeRequest=function(position){
    var long=position.coords.longitude.toString().slice(0,11);
    var lat=position.coords.latitude.toString().slice(0,9);
    var longExt=(position.coords.longitude+1).toString().slice(0,11);
    var latExt=(position.coords.latitude+1).toString().slice(0,9);  
    this.request.bBox = long+","+lat+","+longExt+","+latExt;
};
  //sendRequest sends the request written by writeRequest
  //will need to be called from controller
usgs.prototype.sendRequest=function(request){
    console.log(request);
    $.ajax({
      url: 'https://www.gmtatennis.org/kp/proxy.php',
      format: "json",
      data: request,
      type: "GET"
    })
    //no callback if successful; will be handled from controller
    .done()
    .fail(function(jqXHR, error){
      console.log("error sending request");
    })
  
};
