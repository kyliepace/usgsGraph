var $ = require("jquery");
var Chart = require("chart.js");
Views = function(){
  this.model;
  this.currentSite=0;
  this.hydrograph;
};
Views.prototype.showLoading = function(){
  $('.graph h4').text('Loading content');
};
Views.prototype.endLoading = function(){
  $('.graph h4').text('');
};
Views.prototype.drawGraph  = function(){
  var that = this;
    //update graph caption
    $(".graph h5").text(that.currentSite +1 +" of "+ that.model.numberOfSites+" gages near you");
    //create hydrograph and data variables to be used in myChart
    this.hydrograph = document.getElementById('graph').getContext('2d');

    var that = this;
    var myChart = new Chart(that.hydrograph,{
      type: "line",
      //siteData refers to the site taken from the sitesArray in line 30
      data: {
        labels: that.model.sites[that.currentSite].xData,
        datasets: [{
          label: that.model.sites[that.currentSite].siteName,
          pointStrokeColor: "#fff",
          strokeColor: "rgba(220,220,220,1)",
          data: that.model.sites[that.currentSite].yData,
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
              showXLabels: 10,
              scaleLabel:{
                display: true,
                labelString: "Day (mm-dd)",
              },
              time:{
                parser: true,
                unit: "day",
                unitStepSize: 10,
                displayFormats: {
                  'hour': 'HH:mm', // 13:00
                  'day': 'DD MMM', // 04 June 13:00
                }
              }
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

Views.prototype.changeSites = function(){
  var that = this;
  $("#rightArrow").on("click",function(){
    that.next();
  });
  $("#leftArrow").on("click",function(){
    that.previous();
  });
  $("body").keydown(function(e){
    if (e.which === 37){
      that.next();
    }
    else if (e.which === 39){
      that.previous();
    }
  });
}

Views.prototype.next = function(){
  var that = this;
  if(that.currentSite<that.model.numberOfSites-1){
    that.currentSite ++;
  }
  else{
    that.currentSite = 0;
  }
  that.drawGraph();
}
Views.prototype.previous = function(){
  if(this.currentSite>0){
    this.currentSite --;
  }
  else{
    this.currentSite=this.model.numberOfSites;
  }
  this.drawGraph();
}

module.exports = Views;
 
