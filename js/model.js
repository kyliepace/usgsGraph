//var moment = require("momentjs");
//var $ = require("jquery");
app.model=function(){
  this.numberOfSites;
  this.sites=[];
  this.callback;
};

//the populateSeries method pushes the usgsData into yData and xData arrays
app.model.prototype.populateSeries = function(numberOfSites, siteArray){
  console.log("does this work helloo");
  this.numberOfSites=numberOfSites;
  var that = this;
  for (n=0; n<this.numberOfSites; n++){
    var results = {
      gageName: "",
      xData: [],
      yData: []
    };
    results.gageName=siteArray[n].sourceInfo.siteName;
    //go through each x,y pair in that timeseries's results. 
    $.each(siteArray[n].values[0].value, function(i, value){
        //use moment library to format iso timestamp, then push into xData array
        var timestamp = moment(value.dateTime).format("MM/DD HH:mm");
        results.xData.push(timestamp);
        results.yData.push(parseInt(value.value));
    });
    this.sites.push(results);
  };
  console.log(this.sites);
  //call view.drawGraph()
  this.callback();
};
app.model.prototype.getData = function(position){
  var usgs = new app.usgs();
  var that = this;
  usgs.goTalk(position)
      .done(function(result){
          that.populateSeries(result.value.timeSeries.length, result.value.timeSeries);
          console.log(result);
      }) 
      .fail(function(jqXHR, error){
          console.log("error sending request");
      })
};

//module.exports = app.model;