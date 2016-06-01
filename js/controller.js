app.controllers = function(usgs, model, view){
    // 2.populateSeries with library's results as input when sendRequest is complete
    usgs.sendRequest();
   
   //i need to call model.populateSeries from sendRequest once done, but I can't get it to work


    // 3.push populateSeries arrays to model.sites array
    model.addFlowSeries();
    
    //4.draw the graph with data from the model
    view.drawGraph(model);
};

/////[[[[[[[[[[   ON LOAD    ]]]]]]]]]]]]]]////////////////

$(document).ready(function(){
    var model = new app.models();
    console.log(model);
    var view = new app.views();
     console.log(view);
    var usgs = new app.usgs();
    console.log(usgs);


    //getLocation method will need to be called from controller
    //1. getLocation calls writeRequest and updates usgs.request
    if (navigator.geolocation) {
        //return the geolocation object with writeRequest as a callback
        navigator.geolocation.getCurrentPosition(function(position){
            usgs.writeRequest(position).bind(usgs);
        });
    }
    else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }


    var controller = new app.controllers(usgs, model, view); 
    //does creating the instance of the controller call the functions invoked in that object type?

});
