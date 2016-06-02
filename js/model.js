

app.model=function(){
  this.numberOfSites = 0;
  this.results={
      gageName: "",
      xData: [],
      yData: []
    };
  this.sites=[];
  //this.callback;
};

//the populateSeries method pushes the usgsData into yData and xData arrays
app.model.prototype.populateSeries = function(data){
  console.log(data);
  this.numberOfSites=data.value.timeSeries.length;
  var that = this;
  for (var n=0; n<that.numberOfSites; n++){
    that.results.gageName=data.value.timeSeries[n].sourceInfo.siteName;
    //go through each x,y pair in that timeseries's results. 
    $.each(data.value.timeSeries[n].values[n].value, function(i, value){
        //use moment library to format iso timestamp, then push into xData array
        var timestamp = moment(value.dateTime).format("MM/DD HH:mm");
        that.results.xData.push(timestamp);
        that.results.yData.push(parseInt(value.value));
    })
    that.sites.push(that.results);
  }
  //that.callback();
};
  
app.model.prototype.getData = function(position){
  var usgs = new app.usgs();
  var that = this;
  usgs.goTalk(position)
      //when results are back, populateSeries
      .done(function(data){
          that.populateSeries(data);
      }) 
      .fail(function(jqXHR, error){
          console.log("error sending request");
      });
};