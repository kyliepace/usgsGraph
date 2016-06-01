//create object
app.usgs = function(){
    this.request={
      format: "json",
      bBox: "",
      period: "P5D",
      parameterCD: "00060",
      siteType:"ST",
      siteStatus: "active",
      csurl: 'http://waterservices.usgs.gov/nwis/iv/'
    };
};


  //writeRequest turns the getCurrentPosition object into a string in the request
app.usgs.prototype.writeRequest=function(position){
    var long=position.coords.longitude.toString().slice(0,11);
    var lat=position.coords.latitude.toString().slice(0,9);
    var longExt=(position.coords.longitude+1).toString().slice(0,11);
    var latExt=(position.coords.latitude+1).toString().slice(0,9);  
    this.request.bBox = long+","+lat+","+longExt+","+latExt;
};


  //sendRequest sends the request written by writeRequest
  //will need to be called from controller
app.usgs.prototype.sendRequest=function(){
    console.log(this.request);
    $.ajax({
      url: 'https://www.gmtatennis.org/kp/proxy.php',
      format: "json",
      data: this.request,
      type: "GET"
    })
    .done(function(results){
      app.models.populateSeries(results);
      //why is this not a function??
    }) 
    .fail(function(jqXHR, error){
      console.log("error sending request");
    })  
};

