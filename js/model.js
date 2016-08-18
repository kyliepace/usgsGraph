var moment = require("momentjs");
var $ = require("jquery");
var Usgs = require('./usgs.js');

Model=function(){ //constructor function
  this.numberOfSites;
  this.sites = [];
  this.callback;
  this.view;
};

//the populateSeries method pushes the usgsData into yData and xData arrays
Model.prototype.populateSeries = function(siteArray){
  for (n = 0; n < siteArray.length; n++){
      //if value array is populated, push data into model
      if(siteArray[n].values[0].value.length > 0){
        var results = { //clear results object for each new site
          siteName: "",
          xData: [],
          yData: []
        };
        results.siteName = siteArray[n].sourceInfo.siteName; //populate siteName
        $.each(siteArray[n].values[0].value, function(n, value){
          //go through each x,y pair in that timeseries's results. 
          //use moment library to format iso timestamp, then push into xData array
          results.xData.push(moment(value.dateTime).format("MM/DD"));
          results.yData.push(parseInt(value.value));
        
        });
        this.sites.push(results); //push a results object into the model's array of sites
      }; //close if statement checking for data
  }; //close iterations through each resulting site
  this.numberOfSites = this.sites.length;
  this.callback();
};

Model.prototype.getData = function(state){
  var usgs = new Usgs();
  var that = this;
  usgs.goTalk(state)
      .done(function(result){
          that.populateSeries(result.value.timeSeries);
          that.view.endLoading();
      }) 
      .fail(function(jqXHR, error){
          console.log("error sending request");
      })
};

module.exports = Model;