var moment = require("momentjs");
var $ = require("jquery");
var Usgs = require('./usgs.js');

Model=function(){ //constructor function
  this.numberOfSites;
  this.sites=[];
  this.callback;
  this.view;
};

//the populateSeries method pushes the usgsData into yData and xData arrays
Model.prototype.populateSeries = function(siteArray){
  this.numberOfSites=siteArray.length;
  for (n=0; n<this.numberOfSites; n++){
    var results = { //clear results object
      siteName: "",
      xData: [],
      yData: []
    };
    results.siteName=siteArray[n].sourceInfo.siteName; //populate siteName
    //go through each x,y pair in that timeseries's results. 
    $.each(siteArray[n].values[0].value, function(n, value){
        //use moment library to format iso timestamp, then push into xData array
        results.xData.push(moment(value.dateTime).format("MM/DD"));
        results.yData.push(parseInt(value.value));
    });
    this.sites.push(results); //push a results object into the model's array of sites
  };
  //this.sites = siteArray;
  console.log(this.sites);
  //call view.drawGraph()
  this.callback();
};
Model.prototype.getData = function(position){
  var usgs = new Usgs();
  var that = this;
  usgs.goTalk(position)
      .done(function(result){
          that.populateSeries(result.value.timeSeries);
          console.log(result);
          that.view.endLoading();
      }) 
      .fail(function(jqXHR, error){
          console.log("error sending request");
      })
};



module.exports = Model;