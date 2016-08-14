# usgsGraph
project for thinkful fewd course. use usgs api to get streamflow data from nearby gages. plot data in graphing library. share plot on social media.


Originally sent user location data to usgs api. Graph returned streamflow data using chart.js and moment.js. 

getLocation() needs https so instead the app has a dropdown form. On selection of the state, the usgs api returns all the active streams in that state. The model culls the list down to only sites with data from the past 5 days. Chart.js shows streamflow for those sites for the past 5 days.
