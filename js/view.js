
app.views = function(){
  this.drawGraph = function(models){
    $(".graph h5").text(models.numberOfSites+" gages near you");
    //create hydrograph and data variables to be used in myChart
    var hydrograph = document.getElementById('graph').getContext('2d');
    //check that data exist
    console.log(models.sites);
    var siteData = models.sites[0];
    var myChart = new Chart(hydrograph,{
      type: "line",
      //siteData refers to the site taken from the sitesArray in line 30
      data: {
        labels: models.sites[0].xData,
        datasets: [{
          label: models.sites[0].gageName,
          pointStrokeColor: "#fff",
          strokeColor: "rgba(220,220,220,1)",
          data: models.sites[0].yData,
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
              type: "time",
              scaleLabel:{
                display: true,
                labelString: "Time (hours)"
              },
              time:{
                parser: true,
                unit: "day",
                unitStepSize: 1,
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
  }
};
 