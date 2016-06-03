//var $ = require("jquery");
//var Chart = require("chart.js");
app.views = function(){
  this.model;
  this.currentSite=0;
  this.hydrograph;
  this.xData=[];
  this.yData=[];
  this.siteName;
};
app.views.prototype.arrangeSiteData = function(){
  var that = this;
    this.model.sites[this.currentSite].values[0].value.forEach(function(val, i) {
        that.xData.push(val.dateTime.slice(5,10));
        that.yData.push(parseInt(val.value));
    }, this);
    for (i=0; i<that.xData.length; i++){
      if (i%50 == 0){
        that.xData[i] = that.xData[i]
      }
      else{
        that.xData[i]="";
      }
      
    }
    this.drawGraph();
};
app.views.prototype.drawGraph  = function(){
  console.log(this.model);
  
    $(".graph h5").text(this.model.numberOfSites+" gages near you");
    //create hydrograph and data variables to be used in myChart
    this.hydrograph = document.getElementById('graph').getContext('2d');
    //check that data exist
    console.log(this.model.sites);
    var that = this;
    var myChart = new Chart(that.hydrograph,{
      type: "line",
      //siteData refers to the site taken from the sitesArray in line 30
      data: {
        labels: that.xData,
        datasets: [{
          label: that.model.sites[that.currentSite].sourceInfo.siteName,
          pointStrokeColor: "#fff",
          strokeColor: "rgba(220,220,220,1)",
          data: that.yData,
          borderColor: '#0F5498',
          pointRadius: 0,
          fill: false
        }]
      },
      options: {
        scaleShowLabels: true,
        responsive: true,
        maintainAspectRatio: true,

        scales:{
            xAxes: [{
              type: "category",
              scaleLabel:{
                display: true,
                labelString: "Day (mm-dd)",
              },
              /*time:{
                parser: true,
                unit: "day",
                unitStepSize: 1,
                displayFormats: {
                  'hour': 'HH:mm', // 13:00
                  'day': 'DD MMM', // 04 June 13:00
                }
              }*/
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
};

app.views.prototype.changeSites = function(){
  $("#rightArrow").on("click",function(){
    this.next();
  });
  $("#leftArrow").on("click",function(){
    this.previous();
  })
}

app.views.prototype.next = function(){
  this.currentSite ++;
  this.drawGraph();
}
app.views.prototype.previous = function(){
  this.currentSite --;
  this.drawGraph();
}

//module.exports = app.views;
 
