var siteModel=function(){
  this.sites=[];
  this.numberOfSites = 0;
  this.gageName = "";
  this.xData = [];
  this.yData = [];
}
//the populateSeries method pushes the usgsData into yData and xData arrays
siteModel.prototype.populateSeries = function(results){
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
siteModel.prototype.addFlowSeries = function(flowSeries){
  this.sites.push(flowSeries);
};
