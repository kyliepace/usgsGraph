//[[[[[[[[[[[[[[[[[[[[[[[MODEL]]]]]]]]]]]]]]]]]]]]]]]/////////////////
var models= {};
//add usgsRequest object that is an instance of model that writes and sends request to USGS
models.usgsRequest = function(){
    this.request={
      format: "json",
      bBox: "",
      period: "P5D",
      parameterCD: "00060",
      siteType:"ST",
      siteStatus: "active",
      csurl: 'http://waterservices.usgs.gov/nwis/iv/'
    };
    this.sites=[];
    this.numberOfSites = 0;
    this.yData = [];
    this.xData = [];
    this.gageName = "";
};
//add writeRequest and sendRequest as methods of the usgsRequest object
models.usgsRequest.prototype.getLocation=function(){
    if (navigator.geolocation) {
      //return the geolocation object with writeRequest as a callback
      navigator.geolocation.getCurrentPosition(function(){
          this.writeRequest(position);
      });
    }
    else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
};
  //writeRequest turns the getCurrentPosition object into a string in the request
models.usgsRequest.prototype.writeRequest=function(position){
    var long=position.coords.longitude.toString().slice(0,11);
    var lat=position.coords.latitude.toString().slice(0,9);
    var longExt=(position.coords.longitude+1).toString().slice(0,11);
    var latExt=(position.coords.latitude+1).toString().slice(0,9);  
    this.request.bBox = long+","+lat+","+longExt+","+latExt;
    this.sendRequest(this.request)
};
  //sendRequest sends the request written by writeRequest
models.usgsRequest.prototype.sendRequest=function(request){
    console.log(request);
    $.ajax({
      url: 'https://www.gmtatennis.org/kp/proxy.php',
      format: "json",
      data: request,
      type: "GET"
    })
    //if it works, callback readResult method to put the json data from a site into an array
    .done(this.readResult)
    .fail(function(jqXHR, error){
      console.log("error sending request");
    })
  
};

//the readResult method pushes the usgsData into yData and xData arrays
models.usgsRequest.prototype.readResult = function(results){
    this.numberOfSites=results.value.timeSeries.length;
    //show the name of the result
    this.gageName=results.value.timeSeries[0].sourceInfo.siteName;
    //go through each x,y pair in that timeseries's results. 
    $.each(results.value.timeSeries[0].values[0].value, function(i, value){
      //use moment library to format iso timestamp, then push into xData array
      var timestamp = moment(value.dateTime).format("MM/DD HH:mm");
      this.xData.push(timestamp);
      this.yData.push(parseInt(value.value));
    });
};

//give sites object an addFlowSeries method that adds each flowSeries to the sites array
models.usgsRequest.prototype.addFlowSeries = function(flowSeries){
  this.sites.push(flowSeries);
};
 

///////////////////create the view object type///////////////
var views= {};
views.graph = function(){
  //this.hydrograph = document.getElementById('graph').getContext('2d');
  //declare flowSeries property
  this.flowSeries = {};
};

//create the drawGraph method that shows the number of sites and graphs the data
views.graph.prototype.drawGraph=function(model){
    $(".graph h5").html(model.numberOfSites+" gages near you");
    //create hydrograph and data variables to be used in myChart
    var hydrograph = document.getElementById('graph').getContext('2d');
    var data = model.sites;
    var myChart = new Chart(hydrograph,{
      type: "line",
      data: data;
      options: {
        scaleShowLabels: true,
        responsive: true,
        maintainAspectRatio: true,
        scales:{
            xAxes: [{
              type: "time",
              scaleLabel:{
                display: true,
                labelString: "Time (hours)"
              },
              time:{
                parser: true,
                unit: "day",
                unitStepSize: 0.7,
                displayFormats: {
                  'hour': 'HH:mm', // 13:00
                  'day': 'DD MMM HH:mm', // 04 June 13:00
                }
              }
            }],
            yAxes:[{
              type: "linear",
              scaleLabel:{
                display: true,
                labelString: "Flow (cfs)"
              }
            }]
         }//close scales
       }//close options
    });//close myChart
};//close drawGraph
views.graph.prototype.makeFlowSeries=function(xData, gageName, yData){
   this.flowSeries = {
     labels: xData,
      datasets:[{
        label: gageName,
        pointStrokeColor: "#fff",
        strokeColor: "rgba(220,220,220,1)",
        data: yData,
        borderColor: '#0F5498',
        pointRadius: 0,
        fill: false
      }]
    }
 };

////////////[[[[[[[[[[[  CONTROLLER   ]]]]]]]]]]]
var controllers = function(model, view){
    // getLocation, write, and send request. sequence ends with data pushed into arrays
    model.getLocation();
    //models.sites.addFlowSeries adds the flowSeries created by views.drawGraph.makeFlowSeries given the model's xData,gageName, and yData
    model.addFlowSeries(view.makeFlowSeries(model.xData,model.gageName, model.yData));
    //draw graph from sites array
    view.drawGraph(model);
};
  
  ///////------------ON LOAD------------------////////////
$(document).ready(function(){
    var model = new models.usgsRequest();
    var view = new views.graph();
    var controller = new controllers(model, view);
});
