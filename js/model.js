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
app.models.prototype.populateSeries = function(){
  console.log(usgs);
  var that = this;
  usgs.sendRequest().bind(usgs)
      .done(function(results){
          that.numberOfSites=results.value.timeSeries.length;
          //show the name of the result
          that.results.gageName=results.value.timeSeries[0].sourceInfo.siteName;
          //go through each x,y pair in that timeseries's results. 
          $.each(results.value.timeSeries[0].values[0].value, function(i, value){
          //use moment library to format iso timestamp, then push into xData array
            var timestamp = moment(value.dateTime).format("MM/DD HH:mm");
            that.results.xData.push(timestamp);
            that.yData.push(parseInt(value.value));
          });
  });
  console.log(results);
  //results work
  //the results appear to be not json again
    
};

//give sites object an addFlowSeries method that adds each flowSeries to the sites array
app.models.prototype.addFlowSeries = function(){
  this.sites.push(this.results);
  //need to use this.sites so that correct object gets updated
};
