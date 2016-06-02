

app.model=function(){
  this.numberOfSites = "",
  this.results={
      gageName: "",
      xData: [],
      yData: []
    };
  this.sites=[];
  this.callback;
};

//the populateSeries method pushes the usgsData into yData and xData arrays
app.model.prototype.populateSeries = function(results){
  console.log(results);
  this.numberOfSites=results.value.timeSeries.length;
  for (i=0; i<this.numberOfSites; i++){
    this.results.gageName=results.value.timeSeries[0].sourceInfo.siteName;
    //go through each x,y pair in that timeseries's results. 
    $.each(results.value.timeSeries[0].values[0].value, function(i, value){
        //use moment library to format iso timestamp, then push into xData array
        var timestamp = moment(value.dateTime).format("MM/DD HH:mm");
        this.results.xData.push(timestamp);
        this.yData.push(parseInt(value.value));
    });
    this.sites.push(this.results);
  }
  console.log(this.sites); 
  this.callback();
};
  
app.model.prototype.getData = function(position){
  var usgs = new app.usgs();
  var that = this;
  usgs.goTalk(position)
      //when results are back, populateSeries
      .done(function(results){
          that.populateSeries(results);
      }) 
      .fail(function(jqXHR, error){
          console.log("error sending request");
      });
};