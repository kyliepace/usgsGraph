//create object
var usgs = {
    request:{
      format: "json",
      bBox: "-121.455557,38.561903,-120.455557,39.561903",
      period: "P5D",
      parameterCD: "00060",
      siteType:"ST",
      siteStatus: "active",
      csurl: 'http://waterservices.usgs.gov/nwis/iv/'
    },
    results:{
      numberOfSites: "",
      gageName: "",
      xData: [],
      yData: []
    }
};
//getLocation method will need to be called from controller
usgs.getLocation=function(){
    if (navigator.geolocation) {
      //return the geolocation object with writeRequest as a callback
      navigator.geolocation.getCurrentPosition(usgs.writeRequest);
    }
    else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
};

  //writeRequest turns the getCurrentPosition object into a string in the request
usgs.writeRequest=function(position){
    var long=position.coords.longitude.toString().slice(0,11);
    var lat=position.coords.latitude.toString().slice(0,9);
    var longExt=(position.coords.longitude+1).toString().slice(0,11);
    var latExt=(position.coords.latitude+1).toString().slice(0,9);  
    usgs.request.bBox = long+","+lat+","+longExt+","+latExt;
};


  //sendRequest sends the request written by writeRequest
  //will need to be called from controller
usgs.sendRequest=function(request){
    console.log(request);
    $.ajax({
      url: 'https://www.gmtatennis.org/kp/proxy.php',
      format: "json",
      data: request,
      type: "GET"
    })
    //populateSeries if complete. 
    //why is this not working?
    .done(usgs.populateSeries)
    .fail(function(jqXHR, error){
      console.log("error sending request");
    })  
};

//the populateSeries method pushes the usgsData into yData and xData arrays
usgs.populateSeries = function(results){
  console.log(results);
  //results are undefined
  //the results appear to be not json again
    usgs.results.numberOfSites=results.value.timeSeries.length;
    //show the name of the result
    usgs.results.gageName=results.value.timeSeries[0].sourceInfo.siteName;
    //go through each x,y pair in that timeseries's results. 
    $.each(results.value.timeSeries[0].values[0].value, function(i, value){
      //use moment library to format iso timestamp, then push into xData array
      var timestamp = moment(value.dateTime).format("MM/DD HH:mm");
      usgs.results.xData.push(timestamp);
      usgs.results.yData.push(parseInt(value.value));
    });
};
