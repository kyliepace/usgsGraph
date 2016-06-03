//var moment = require("momentjs");
//var $ = require("jquery");
app.model=function(){
  this.numberOfSites;
  this.sites=[];
  this.callback;
};

//the populateSeries method pushes the usgsData into yData and xData arrays
app.model.prototype.populateSeries = function(numberOfSites, siteArray){
  this.numberOfSites=numberOfSites;
  /*for (n=0; n<this.numberOfSites; n++){
    var results = {
      gageName: "",
      xData: [],
      yData: []
    };
    results.gageName=siteArray[n].sourceInfo.siteName;
    //go through each x,y pair in that timeseries's results. 
    $.each(siteArray[n].values[0].value, function(n, value){
        //use moment library to format iso timestamp, then push into xData array
        results.xData.push(moment(value.dateTime).format("MM/DD"));
        results.yData.push(parseInt(value.value));
    });
    this.sites.push(results);
  };*/
  this.sites = siteArray;
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