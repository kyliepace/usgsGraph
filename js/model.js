var app = {};

app.models=function(){
  this.numberOfSites = "",
  this.results={
      gageName: "",
      xData: [],
      yData: []
    };
  this.sites=[];
  //add .gotDataCallback that calls a view method
};

//the populateSeries method pushes the usgsData into yData and xData arrays
app.models.prototype.populateSeries = function(results){

  console.log(results);
  this.numberOfSites=results.value.timeSeries.length;
  //show the name of the result
  this.results.gageName=results.value.timeSeries[0].sourceInfo.siteName;
  //go through each x,y pair in that timeseries's results. 
  $.each(results.value.timeSeries[0].values[0].value, function(i, value){
        //use moment library to format iso timestamp, then push into xData array
    var timestamp = moment(value.dateTime).format("MM/DD HH:mm");
    this.results.xData.push(timestamp);
    this.yData.push(parseInt(value.value));
  });
};
  

//give sites object an addFlowSeries method that adds each flowSeries to the sites array
app.models.prototype.addFlowSeries = function(){
  this.sites.push(this.results);
  //need to use this.sites so that correct object gets updated
};
