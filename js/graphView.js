
var views = function(){
  //this.hydrograph = document.getElementById('graph').getContext('2d');
  //declare flowSeries property
  this.flowSeries = {};
};

//create a flowSeries from the model data
views.prototype.makeFlowSeries=function(xData, gageName, yData){
   this.flowSeries = {
     labels: xData,
      datasets:[{
        label: gageName,
        pointStrokeColor: "#fff",
        strokeColor: "rgba(220,220,220,1)",
        data: yData,
        borderColor: '#0F5498',
        pointRadius: 0,
        fill: false
      }]
    }
 };
 
 
//create the drawGraph method that shows the number of sites and graphs the data
views.prototype.drawGraph=function(numSites, sitesArray){
    $(".graph h5").html(numSites+" gages near you");
    //create hydrograph and data variables to be used in myChart
    var hydrograph = document.getElementById('graph').getContext('2d');
    var siteData = sitesArray[0]
    var myChart = new Chart(hydrograph,{
      type: "line",
      //siteData refers to the site taken from the sitesArray in line 30
      data: siteData,
      options: {
        scaleShowLabels: true,
        responsive: true,
        maintainAspectRatio: true,
        scales:{
            xAxes: [{
              type: "time",
              scaleLabel:{
                display: true,
                labelString: "Time (hours)"
              },
              time:{
                parser: true,
                unit: "day",
                unitStepSize: 0.7,
                displayFormats: {
                  'hour': 'HH:mm', // 13:00
                  'day': 'DD MMM HH:mm', // 04 June 13:00
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
};//close drawGraph



